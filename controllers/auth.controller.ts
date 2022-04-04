import { Response, Request } from 'express';

import User from '../interfaces/User.interface';
import httpCode from '../utils/httpcodes';
import UserModel from '../models/User.model';
import bycrypt from '../utils/bycrypt';
import jwt from '../utils/jwt';
import config from '../config/app.config';
import DatabaseOperations from '../utils/dbOperations';
import redis from '../utils/redis';

class Authenticator {
	/**
	 * @param req express.Request
	 * @param res express.Response
	 * @description Register new user
	 */
	static signup = async (req: Request, res: Response) => {
		try {
			const body: User = {
				username: req.body.username,
				password: req.body.password,
				confirmPassword: req.body.confirmPassword,
				interestedTech: req.body.interestedTech,
				expertizedTech: req.body.expertizedTech,
				languages: req.body.languages,
				fullName: req.body.fullName || null,
				mail: req.body.mail || null,
				description: req.body.description || null,
				institution: req.body.institution || null,
				gender: req.body.gender || null,
				phone: req.body.phone || null,
				address: req.body.address || null,
			};

			const pattern = new RegExp(config.auth.PASSWORD_PATTERN);

			// Check password pattern
			if (!pattern.test(body.password))
				return res.status(httpCode.BAD_REQUEST).json({
					message: "Passwords doesn't requirements",
					details: {
						value: body.password,
						pattern: String(config.auth.PASSWORD_PATTERN),
					},
				});

			// Password comparison
			if (body.password !== body.confirmPassword)
				return res.status(httpCode.BAD_REQUEST).json({
					message: 'Passwords are not matched',
					details: { password: body.password, confirmPassword: body.confirmPassword },
				});

			// Password encryption
			const passwordHash = await bycrypt.encryptPassword(body.password);
			const user: User = { ...body, password: passwordHash };

			// Save new user in database
			const result = await UserModel.create(user);

			return res.status(httpCode.CREATED).json({ message: 'User data saved successfully', data: result });
		} catch (error: any) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
				message: error.message || 'Unknown Error Occurred',
				details: error,
			});
		}
	};

	/**
	 * @param req express.Request
	 * @param res express.Response
	 * @description Authenticates user and returns jwttemp token for successful authentication
	 */
	static login = async (req: Request, res: Response) => {
		try {
			const body: { username: string; password: string } = req.body;

			// Find user by username
			UserModel.findOne({ username: body.username }).then((response) => {
				if (!response) {
					return res.status(httpCode.NOT_FOUND).json({ message: 'User not found', details: null });
				} else {
					// Compare passwords
					bycrypt.comparePassword(body.password, response.password).then(async (result) => {
						if (!result) {
							return res.status(httpCode.UNAUTHORIZED).json({ message: 'Wrong password', details: null });
						} else {
							const accessToken = jwt.getAccessToken(body.username);
							const refreshToken = jwt.getRefreshToken(body.username);

							const accessTokenKey = config.db.REDIS_AT_PREFIX + response.username;
							const refreshTokenKey = config.db.REDIS_RT_PREFIX + response.username;

							// Save access token in redis with expiration time or overrides existing key value
							redis
								.setex(accessTokenKey, parseInt(config.auth.JWT_EXPIRES_IN), accessToken)
								.catch((error) => {
									return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
										message: error.message || 'Unknown error occurred while saving JWT Token',
										details: error,
									});
								});

							// Save refresh token in redis with expiration time or overrides existing key value
							redis
								.setex(refreshTokenKey, parseInt(config.auth.JWT_REFRESH_EXPIRES_IN), refreshToken)
								.catch((error) => {
									return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
										message: error.message || 'Unknown error occurred while saving JWT Token',
										details: error,
									});
								});

							return res
								.status(httpCode.OK)
								.json({ message: 'User logged in successfully', data: { accessToken, refreshToken } });
						}
					});
				}
			});
		} catch (error: any) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
				message: error.message || 'Unknown Error Occurred',
				details: error,
			});
		}
	};

	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Update user details
	 */
	static update = async (req: Request, res: Response) => {
		try {
			if (!req.body.username || !req.body.data) {
				return res.status(httpCode.BAD_REQUEST).json({
					message: 'Failed to update document',
					details: { id: null, data: null },
				});
			} else {
				const id: string = req.body.id;
				const data = { ...req.body.data };

				return DatabaseOperations.update(UserModel, { id }, data, res);
			}
		} catch (error: any) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
				message: error.message || 'Unknown Error Occurred',
				details: error,
			});
		}
	};

	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Deletes user record
	 */
	static remove = async (req: Request, res: Response) => {
		try {
			const username: string = req.body.username;

			return DatabaseOperations.delete(UserModel, { username }, res);
		} catch (error: any) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
				message: error.message || 'Unknown Error Occurred',
				details: error,
			});
		}
	};

	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Send refresh token to client if user is authorized
	 */
	static refresh = async (req: Request, res: Response) => {
		try {
			const body: { refreshToken: string } = req.body;

			if (!body.refreshToken) {
				return res.status(httpCode.FORBIDDEN).json({ message: 'No refresh token', details: null });
			}

			jwt.verifyToken(body.refreshToken, config.auth.JWT_REFRESH_SECRET_KEY)
				.then(async (result) => {
					const accessToken = jwt.getAccessToken(result.username);

					const accessTokenKey = config.db.REDIS_AT_PREFIX + result.username;
					const refreshTokenKey = config.db.REDIS_RT_PREFIX + result.username;

					const refreshToken = await redis.get(refreshTokenKey);

					if (refreshToken !== body.refreshToken)
						return res.status(httpCode.FORBIDDEN).json({ message: 'Invalid user token', details: null });

					redis.setex(accessTokenKey, parseInt(config.auth.JWT_EXPIRES_IN), accessToken).catch((error) => {
						return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
							message: error.message || 'Unknown error occurred while saving JWT Token',
							details: error,
						});
					});

					return res.status(httpCode.OK).json({ accessToken });
				})
				.catch((error) => {
					return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
						message: error.message || 'Unable to verify JWT Token',
						details: error,
					});
				});
		} catch (error: any) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
				message: error.message || 'Unknown Error Occurred',
				details: error,
			});
		}
	};

	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Logout user and deletes the refresh token from the database.
	 */
	static logout = async (req: Request, res: Response) => {
		try {
			const body: { username: string } = req.body;

			const accessTokenKey = config.db.REDIS_AT_PREFIX + body.username;
			const refreshTokenKey = config.db.REDIS_RT_PREFIX + body.username;

			redis.del(accessTokenKey).catch((error) => {
				return res
					.status(httpCode.INTERNAL_SERVER_ERROR)
					.json({ message: error.message || 'Logout failed due to DB error', details: error });
			});

			redis.del(refreshTokenKey).catch((error) => {
				return res
					.status(httpCode.INTERNAL_SERVER_ERROR)
					.json({ message: error.message || 'Logout failed due to DB error', details: error });
			});

			return res.status(httpCode.OK).json({ message: 'Successfully logout' });
		} catch (error: any) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
				message: error.message || 'Unknown Error Occurred',
				details: error,
			});
		}
	};
}

export default Authenticator;
