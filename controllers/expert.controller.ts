import { Request, Response } from 'express';

import httpCode from '../utils/httpcodes';
import Expert from '../interfaces/Expert.interface';
import UserModel from '../models/User.model';
import DatabaseOperations from '../utils/dbOperations';

class ExpertController {
	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description
	 * Successful response contains feed based on user interested tech, institution, language, description and gender fields
	 */
	static getFeed = (req: Request, res: Response) => {
		try {
			const body: Expert = { ...req.body };
			// get free
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

			DatabaseOperations.getOne(UserModel, { id }, res);
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
		}
	};
}

export default ExpertController;
