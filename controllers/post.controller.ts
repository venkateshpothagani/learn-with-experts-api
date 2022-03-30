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
			const body: Post = { ...req.body };

			DatabaseOperations.create(PostModel, body, res);
		} catch (error) {
			return res
				.status(httpCode.INTERNAL_SERVER_ERROR)
				.json({ error: { message: 'Unknown Error Occurred', details: error } });
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

			DatabaseOperations.delete(PostModel, body, res);
		} catch (error) {
			return res
				.status(httpCode.INTERNAL_SERVER_ERROR)
				.json({ error: { message: 'Unknown Error Occurred', details: error } });
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
			const body: Post = { ...req.body };
			PostModel.find({ ...body })
				.sort({ timestamp: -1 })
				.then((result) => {
					return res.status(httpCode.OK).json(result);
				})
				.catch((error) => {
					return res
						.status(httpCode.INTERNAL_SERVER_ERROR)
						.json({ error: { message: 'Unable to get feed', details: error } });
				});
		} catch (error) {
			return res
				.status(httpCode.INTERNAL_SERVER_ERROR)
				.json({ error: { message: 'Unknown Error Occurred', details: error } });
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
			const body: { id: string } = req.body;

			DatabaseOperations.getOne(PostModel, body, res);
		} catch (error) {
			return res
				.status(httpCode.INTERNAL_SERVER_ERROR)
				.json({ error: { message: 'Unable to verify JWT Token', details: error } });
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
			const body: { id: string; post: Post } = { ...req.body };

			DatabaseOperations.update(PostModel, { id: body.id }, { ...body.post }, res);
		} catch (error) {
			return res
				.status(httpCode.INTERNAL_SERVER_ERROR)
				.json({ error: { message: 'Unable to verify JWT Token', details: error } });
		}
	};
}

export default PostController;
