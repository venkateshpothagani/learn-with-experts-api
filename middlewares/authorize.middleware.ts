import httpCode from '../utils/httpcodes';
import config from '../config/app.config';
import jwt from '../utils/jwt';

/**
 *
 * @param req express.Request
 * @param res express.Response
 * @param next express.NextFunction
 * @returns abstract
 * @description Function checks if user is authorized to access the route
 *
 * This function is a middleware for checking JWT token in routes where authorization is required
 *
 * If token is valid, it will be decoded and stored in req.username
 *
 * If token is invalid, it will be returned with error message and status code `403`
 *
 * If token is not provided, it will be returned with error message and status code `401`
 *
 * If token is expired, it will be returned with error message and status code `403`
 *
 */
const authorize = (req: any, res: any, next: any) => {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if (token == null)
			return res.sendStatus(httpCode.UNAUTHORIZED).json({ message: 'No token, authorization denied' });

		jwt.verifyToken(token, config.auth.JWT_SECRET_KEY, (error: any, decoded: any) => {
			if (error) {
				return res.sendStatus(httpCode.UNAUTHORIZED).json({ error: error, message: 'Bad token' });
			} else {
				req.body.username = decoded.username;
				// next();
			}
		});
	} catch (error) {
		res.sendStatus(httpCode.INTERNAL_SERVER_ERROR).json(error, {
			message: 'Unexpected error while authorizing user',
		});
	}
};

export default authorize;
