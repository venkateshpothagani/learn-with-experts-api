import { Request, Response } from 'express';

import httpCode from '../utils/httpcodes';
import Expert from '../interfaces/Expert.interface';
import UserModel from '../models/User.model';

class ExpertController {
	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description
	 */
	static getFeed = (req: Request, res: Response) => {
		try {
			const body: Expert = { ...req.body };

			UserModel.find({ ...body })
				.then((result) => {
					return res.status(httpCode.ACCEPTED).json(result);
				})
				.catch((error) => {
					return res.status(httpCode.BAD_REQUEST).json(error);
				});
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
		}
	};

	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description
	 */
	static getOne = (req: Request, res: Response) => {
		try {
			const id: string = req.params.id;

			UserModel.findById(id)
				.then((result) => {
					return res.status(httpCode.ACCEPTED).json(result);
				})
				.catch((error) => {
					return res.status(httpCode.BAD_REQUEST).json(error);
				});
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
		}
	};
}

export default ExpertController;
