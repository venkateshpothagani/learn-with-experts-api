import { Response, Request } from 'express';

import User from '../interfaces/User.interface';
import httpCode from '../utils/httpcodes';
import UserModel from '../models/User.model';
import RefreshTokenModel from '../models/RefreshToken.model';
import bycrypt from '../utils/bycrypt';
import jwt from 'jsonwebtoken';
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
			const body: User = req.body;

			const pattern = new RegExp(config.auth.PASSWORD_PATTERN);

			// Check password pattern
			if (!pattern.test(body.password))
				return res.status(httpCode.BAD_REQUEST).json({ error: { message: "Passwords doesn't requirements" } });

			// Password comparison
			if (!(body.password === body.confirmPassword))
				return res.status(httpCode.BAD_REQUEST).json({ error: { message: 'Passwords are not matched' } });

			// Password encryption
			const passwordHash = await bycrypt.encryptPassword(body.password);
			const user: User = { ...body, password: passwordHash };

			// Save new user in database
			UserModel.create(user)
				.then((result) => {
					return res
						.status(httpCode.CREATED)
						.json({ id: result.id, username: result.username, fullName: result.fullName });
				})
				.catch((error) => {
					return res.status(httpCode.BAD_REQUEST).json(error);
				});
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
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
					return res.status(httpCode.BAD_REQUEST).json({ message: 'User not found' });
				} else {
					// Compare passwords
					bycrypt.comparePassword(body.password, response.password).then((result) => {
						if (!result) {
							return res.status(httpCode.BAD_REQUEST).json({ error: { message: 'Wrong password' } });
						} else {
							const accessToken = jwt.sign({ username: body.username }, config.auth.JWT_SECRET_KEY, {
								expiresIn: config.auth.JWT_EXPIRES_IN,
							});

							const refreshToken = jwt.sign(
								{ username: body.username },
								config.auth.JWT_REFRESH_SECRET_KEY,
								{ expiresIn: config.auth.JWT_REFRESH_EXPIRES_IN }
							);

							const accessTokenKey = config.db.REDIS_AT_PREFIX + response.username;
							const refreshTokenKey = config.db.REDIS_RT_PREFIX + response.username;

							// Save access token in redis with expiration time
							redis.setex(accessTokenKey, config.auth.JWT_EXPIRES_IN, accessToken).catch((error) => {
								clear

							// Save refresh token in redis with expiration time
							redis
								.setex(refreshTokenKey, config.auth.JWT_REFRESH_EXPIRES_IN, refreshToken)
								.catch((error) => {
									return res.status(httpCode.INTERNAL_SERVER_ERROR).json({ error });
								});
						}
					});
				}
			});
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json({ error });
		}
	};

	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @returns
	 */
	static update = async (req: Request, res: Response) => {
		try {
			const id: string = req.body.id;
			const data = { ...req.body.data };

			DatabaseOperations.update(UserModel, { id }, data, res);
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
		}
	};

	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @returns
	 */
	static remove = async (req: Request, res: Response) => {
		try {
			const id: string = req.body.id;

			DatabaseOperations.delete(UserModel, { id }, res);
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
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
				return res.status(httpCode.FORBIDDEN).json({ message: 'No refresh token' });
			}
			jwt.verify(body.refreshToken, config.auth.JWT_REFRESH_SECRET_KEY, (error: any, decoded: any) => {
				if (error) {
					return res.status(httpCode.UNAUTHORIZED).json(error);
				}
				const accessToken = jwt.sign({ username: decoded.username }, config.auth.JWT_SECRET_KEY, {
					expiresIn: config.auth.JWT_EXPIRES_IN,
				});
				return res.status(httpCode.OK).json({ accessToken });
			});
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
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
			const body: { refreshToken: string } = req.body;

			const authHeader = req.headers['authorization'];
			const accessToken = authHeader && authHeader.split(' ')[1];

			if (!body.refreshToken) {
				return res.status(httpCode.UNAUTHORIZED).json({ message: 'No refresh token' });
			} else {
				jwt.verify(body.refreshToken, config.auth.JWT_REFRESH_SECRET_KEY, (error: any, decoded: any) => {
					if (error) return res.status(httpCode.UNAUTHORIZED).json(error);

					RefreshTokenModel.deleteOne({
						username: 'temp ' + decoded.username,
						refreshToken: accessToken,
					}).catch((error) => {
						return res.status(httpCode.BAD_REQUEST).json(error);
					});

					RefreshTokenModel.deleteOne({
						username: decoded.username,
						refreshToken: body.refreshToken,
					})
						.then((result) => {
							return res.status(httpCode.OK).json(result);
						})
						.catch((error) => {
							return res.status(httpCode.BAD_REQUEST).json(error);
						});
				});
			}
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
		}
	};
}

export default Authenticator;
