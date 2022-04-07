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
	static updateVote = (req: Request, res: Response) => {};
}

export default VoteController;
