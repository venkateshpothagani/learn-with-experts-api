import jwt from 'jsonwebtoken';
import config from '../config/app.config';

class JWT {
	/**
	 *
	 * @param username string
	 * @returns string
	 * @description Function generates JWT token for user
	 *
	 */
	static accessTokenGenerator(username: string) {
		return jwt.sign({ username }, config.auth.JWT_SECRET_KEY, { expiresIn: config.auth.JWT_EXPIRES_IN });
	}

	/**
	 *
	 * @param username string
	 * @returns data string
	 * @description Function generates JWT refresh token for user
	 *
	 */
	static refreshTokenGenerator(username: string) {
		return jwt.sign({ username }, config.auth.JWT_REFRESH_SECRET_KEY);
	}

	/**
	 *
	 * @param token string
	 * @param secret string
	 * @param options any
	 * @param callback Function
	 * @returns data JwtPayload
	 * @description	Function verifies JWT token
	 */
	static verifyToken(token: string, secret: string, callback: any): void | jwt.JwtPayload | string {
		return jwt.verify(token, secret, callback);
	}
}

export default JWT;
