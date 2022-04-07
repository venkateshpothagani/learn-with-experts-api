import { Request, Response } from 'express';

import httpCode from '../utils/httpcodes';
import UserModel from '../models/User.model';
import DatabaseOperations from '../utils/dbOperations';

class ExpertController {
	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Successful response contains feed based on client interested tech
	 * Reponse consists only few fields `username fullName mail interestedTech expertizedTech languages`
	 */
	static getFeed = async (req: Request, res: Response) => {
		try {
			const body: { tagOne: string; tagTwo: string; tagThree: string } = { ...req.body };

			// Filter users based on their expertizedTech
			// Response contains only few fields
			const result = await UserModel.find(
				{
					$or: [
						{ expertizedTech: { $in: body.tagOne } },
						{ expertizedTech: { $in: body.tagTwo } },
						{ expertizedTech: { $in: body.tagThree } },
					],
				},
				'username fullName mail interestedTech expertizedTech languages'
			);
			return res.status(httpCode.OK).json(result);
		} catch (error: any) {
			return res
				.status(httpCode.INTERNAL_SERVER_ERROR)
				.json({ message: error.message || 'Unknown Error Occurred', details: error });
		}
	};

	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Successful response contains user/expert details
	 */
	static getOne = (req: Request, res: Response) => {
		try {
			const id: string = req.params.id;
			return DatabaseOperations.getOne(UserModel, { id }, res);
		} catch (error: any) {
			return res
				.status(httpCode.INTERNAL_SERVER_ERROR)
				.json({ message: error.message || 'Unknown Error Occurred', details: error });
		}
	};
}

export default ExpertController;
