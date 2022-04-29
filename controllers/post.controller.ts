import { Request, Response } from 'express';

import httpCode from '../utils/httpcodes';
import Post from '../interfaces/Post.interface';
import PostModel from '../models/Post.model';
import DatabaseOperations from '../utils/dbOperations';

class PostController {
	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Create a new post
	 */
	static create = async (req: Request, res: Response) => {
		try {
			const body: Post = {
				userRef: req.body.id,
				type: req.body.type,
				description: req.body.description,
				tags: req.body.tags,
				timestamp: Date.now(),
			};

			return DatabaseOperations.create(PostModel, body, res);
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
	 * @description Remove a post
	 */
	static remove = async (req: Request, res: Response) => {
		try {
			const body: { id: string } = req.body;

			return DatabaseOperations.delete(PostModel, body, res);
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
	 * @description
	 * Get all posts\
	 * Feed depends on user interested tech and sort by timestamp.
	 */
	static getFeed = async (req: Request, res: Response) => {
		try {
			// const body: { type: string; tagOne: string; tagTwo: string; tagThree: string } = {
			// 	type: req.body.type,
			// 	tagOne: req.body.tagOne,
			// 	tagTwo: req.body.tagTwo,
			// 	tagThree: req.body.tagThree,
			// };

			// const result = await PostModel.find({ type: body.type }).find({
			// 	$or: [{ tags: { $in: body.tagOne } }, { tags: { $in: body.tagTwo } }, { tags: { $in: body.tagThree } }],
			// });
			const result = await PostModel.find({
				description: { $exists: true },
				$expr: { $gt: [{ $strLenCP: '$description' }, 20] },
			});

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
	 * @description Get a post
	 */
	static getOne = async (req: Request, res: Response) => {
		try {
			return DatabaseOperations.getOne(PostModel, { _id: req.params.id }, res);
		} catch (error: any) {
			return res
				.status(httpCode.INTERNAL_SERVER_ERROR)
				.json({ message: error.message || 'Unable to verify JWT Token', details: error });
		}
	};

	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Update a post
	 */
	static update = async (req: Request, res: Response) => {
		try {
			const body: Post = { ...req.body };

			return DatabaseOperations.update(PostModel, { _id: req.params.id }, body, res);
		} catch (error: any) {
			return res
				.status(httpCode.INTERNAL_SERVER_ERROR)
				.json({ message: error.message || 'Unable to verify JWT Token', details: error });
		}
	};
}

export default PostController;
