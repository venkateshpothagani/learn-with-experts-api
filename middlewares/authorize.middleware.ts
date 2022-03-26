import httpCode from '../utils/httpcodes';
import config from '../config/app.config';
import jwt from '../utils/jwt';
import redis from '../utils/redis';

/**
 *
 * @param req express.Request
 * @param res express.Response
 * @param next express.NextFunction
 * @returns abstract
 * @description Function checks if user is authorized to access the route
 * 1. Token is null or not
 * 2. Validate token
 * 3. Compare with server stored token
 */
const authorize = (req: any, res: any, next: any) => {
	try {
		//Get token from user request
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if (token == null)
			return res.status(httpCode.UNAUTHORIZED).json({
				error: {
					message: 'Access Token required to validate client',
					details: null,
				},
			});

		//Validate token
		jwt.verifyToken(token, config.auth.JWT_SECRET_KEY).then(async (result) => {
			if (!result) {
				return res.status(httpCode.FORBIDDEN).json({ error: { message: '', details: null } });
			}
			const key = config.db.REDIS_AT_PREFIX + result.username;

			const value = await redis.get(key);

			if (!value || value !== token) return res.status(httpCode.FORBIDDEN).json({});

			req.body.username = result.username;
			next();
		});
	} catch (error) {
		return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
			error: { message: 'Unknown Error Occurred', details: error },
		});
	}
};

export default authorize;
