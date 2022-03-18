import { Response, Request } from 'express';

import User from '../interfaces/User.interface';
import httpCode from '../utils/httpcodes';
import UserModel from '../models/User.model';
import RefreshTokenModel from '../models/RefreshToken.model';
import bycrypt from '../utils/bycrypt';
import jwt from '../utils/jwt';
import config from '../config/app.config';

class Authenticator {
	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Register new user
	 */
	static signup = async (req: Request, res: Response) => {
		try {
			const body: User = req.body;

			// Check password pattern
			const pattern = new RegExp(config.auth.PASSWORD_PATTERN);
			if (!pattern.test(body.password))
				return res.status(httpCode.BAD_REQUEST).json({ message: "Passwords doesn't requirements" });

			if (!(body.password === body.confirmPassword))
				// Password comparison
				return res.status(httpCode.BAD_REQUEST).json({ message: 'Passwords are not matched' });

			// Password encryption
			const passwordHash = await bycrypt.encryptPassword(body.password);
			const user: User = { ...body, password: passwordHash };

			// Create new user in database
			UserModel.create(user, (error, user) => {
				if (error) return res.status(httpCode.BAD_REQUEST).json(error);
				return res.status(httpCode.CREATED).json(user);
			});
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
		}
	};

	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Authenticates user and returns jwt token for successful authentication
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
							return res.status(httpCode.BAD_REQUEST).json({ message: 'Invalid password' });
						} else {
							const accessToken = jwt.accessTokenGenerator(response.username);
							const refreshToken = jwt.refreshTokenGenerator(response.username);

							// Save refresh token in database
							RefreshTokenModel.create({ username: response.username, refreshToken }, (error, token) => {
								if (error) return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
								return res.status(httpCode.OK).json({ accessToken, refreshToken: token.refreshToken });
							});
						}
					});
				}
			});
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
			jwt.verifyToken(body.refreshToken, config.auth.JWT_REFRESH_SECRET_KEY, (error: any, decoded: any) => {
				if (error) {
					return res.status(httpCode.UNAUTHORIZED).json(error);
				}
				const accessToken = jwt.accessTokenGenerator(decoded.username);
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
			if (!body.refreshToken) {
				return res.status(httpCode.UNAUTHORIZED).json({ message: 'No refresh token' });
			} else {
				return jwt.verifyToken(
					body.refreshToken,
					config.auth.JWT_REFRESH_SECRET_KEY,
					(error: any, decoded: any) => {
						if (error) return res.status(httpCode.UNAUTHORIZED).json(error);
						RefreshTokenModel.deleteOne({
							username: decoded.username,
							refreshToken: body.refreshToken,
						}).then((response) => {
							return res.status(httpCode.OK).json(response);
						});
					}
				);
			}
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
		}
	};
}

export default Authenticator;
