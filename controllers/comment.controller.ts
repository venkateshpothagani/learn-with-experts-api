import { Request, Response } from 'express';

import httpCode from '../utils/httpcodes';
import Comment from '../interfaces/Comment.interface';
import CommentModel from '../models/Comment.model';
import DatabaseOperations from '../utils/dbOperations';

class CommentController {
	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Create a new post
	 */
	static create = async (req: Request, res: Response) => {
		try {
			const body: Comment = { ...req.body };

			DatabaseOperations.create(CommentModel, body, res);
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
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

			DatabaseOperations.delete(CommentModel, body, res);
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
		}
	};

	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Get all posts
	 */
	static getFeed = async (req: Request, res: Response) => {
		try {
			const body: Comment = { ...req.body };

			CommentModel.find({ ...body })
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
	 * @description Get a post
	 */
	static getOne = async (req: Request, res: Response) => {
		try {
			const body: { id: string } = req.body;

			DatabaseOperations.getOne(CommentModel, body, res);
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
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
			const body: { id: string; post: Comment } = { ...req.body };

			DatabaseOperations.update(CommentModel, { id: body.id }, { ...body.post }, res);
		} catch (error) {
			return res.status(httpCode.INTERNAL_SERVER_ERROR).json(error);
		}
	};
}

export default CommentController;
