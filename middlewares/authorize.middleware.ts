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

		if (token == null) return res.status(httpCode.UNAUTHORIZED).json({ message: 'Access token required.' });

		jwt.verifyToken(token, config.auth.JWT_SECRET_KEY, (error: any, decoded: any) => {
			if (error) {
				return res.status(httpCode.UNAUTHORIZED).json(error);
			} else {
				req.body.username = decoded.username;
				next();
			}
		});
	} catch (error) {
		return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
	}
};

export default authorize;
