import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/app.config';
import { CustomJwtPayload } from '../interfaces/JWTInterfaces';

class JWT {
	/**
	 *
	 * @param username string
	 * @returns string
	 * @description Function generates JWT token for user
	 *
	 */
	static getAccessToken(username: string, id: string) {
		return jwt.sign({ username, id }, config.auth.JWT_SECRET_KEY, { expiresIn: config.auth.JWT_EXPIRES_IN });
	}

	/**
	 *
	 * @param username string
	 * @returns data string
	 * @description Function generates JWT refresh token for user
	 *
	 */
	static getRefreshToken(username: string, id: string) {
		return jwt.sign({ username }, config.auth.JWT_REFRESH_SECRET_KEY, {
			expiresIn: config.auth.JWT_REFRESH_EXPIRES_IN,
		});
	}

	/**
	 *
	 * @param token string
	 * @param secret string
	 * @returns  Promise< CustomJwtPayload >
	 * @description	Function verifies JWT token
	 */
	static verifyToken = (token: string, secret: string) => {
		return new Promise<any>((resolve, reject) => {
			jwt.verify(token, secret, (error: jwt.VerifyErrors | null, decoded: any) => {
				if (error) {
					return reject(error);
				}
				return resolve(decoded);
			});
		});
	};
}

export default JWT;
