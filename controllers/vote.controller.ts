import { Request, Response } from 'express';

import httpCode from '../utils/httpcodes';
import Vote from '../interfaces/Vote.interface';
import VoteModel from '../models/Vote.model';
import DatabaseOperations from '../utils/dbOperations';

class VoteController {
	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Add or remove votes of a specific comment or post.
	 */
	static addVote = (req: Request, res: Response) => {
		try {
			const body: Vote = { ...req.body };

			DatabaseOperations.create(VoteModel, body, res);
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
		}
	};
}

export default VoteController;
