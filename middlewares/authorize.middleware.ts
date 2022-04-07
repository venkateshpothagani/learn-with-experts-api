import httpCode from '../utils/httpcodes';
import config from '../config/app.config';
import jwt from '../utils/jwt';
import redis from '../utils/redis';
import { Response, Request, NextFunction } from 'express';

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
const authorize = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//Get token from user request
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if (token == null)
			return res
				.status(httpCode.UNAUTHORIZED)
				.json({ message: 'Access Token required to validate client', details: null });

		const result = await jwt.verifyToken(token, config.auth.JWT_SECRET_KEY);

		if (!result.username)
			return res.status(httpCode.FORBIDDEN).json({ message: 'User token verification failed', details: result });

		const key = config.db.REDIS_AT_PREFIX + result.username;
		const value = await redis.get(key);

		if (!value || value !== token)
			return res.status(httpCode.FORBIDDEN).json({ message: 'User token verification failed', details: value });

		req.body.username = result.username;
		req.body.id = result.id;

		next();

		// Validate token
		// jwt.verifyToken(token, config.auth.JWT_SECRET_KEY)
		// 	.then(async (result) => {
		// if (!result)
		// 	return res
		// 		.status(httpCode.FORBIDDEN)
		// 		.json({ message: 'User token verification failed', details: result });

		// 	const key = config.db.REDIS_AT_PREFIX + result.username;

		// 	redis
		// 		.get(key)
		// 		.then((value) => {
		// 			if (!value || value !== token)
		// 				return res
		// 					.status(httpCode.FORBIDDEN)
		// 					.json({ message: 'User token verification failed', details: value });
		// 			req.body.username = result.username;
		// 			req.body.id = result.id;
		// 			next();
		// 		})
		// 		.catch((error) => {
		// 			return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
		// 				message: error.message || 'Error occurred while validating user token',
		// 				details: error,
		// 			});
		// 		});
		// })
		// .catch((error) => {
		// 	return res.status(httpCode.FORBIDDEN).json({
		// 		message: error.message || 'Invalid user token',
		// 		details: error,
		// 	});
		// });
	} catch (error: any) {
		return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
			message: error.message || 'Unknown Error Occurred',
			details: error,
		});
	}
};

export default authorize;
