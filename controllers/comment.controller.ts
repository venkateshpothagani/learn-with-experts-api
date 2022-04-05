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
	 * @description Create a new comment
	 */
	static create = async (req: Request, res: Response) => {
		try {
			const body: Comment = {
				userRef: req.body.id,
				postRef: req.body.postRef,
				description: req.body.description,
				timestamp: Date.now(),
			};

			return DatabaseOperations.create(CommentModel, body, res);
		} catch (error: any) {
			return res
				.status(httpCode.INTERNAL_SERVER_ERROR)
				.json({ message: error.message || 'Unknown error occurred', details: error });
		}
	};

	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Remove a Comment
	 */
	static remove = async (req: Request, res: Response) => {
		try {
			const id: string = req.params.id;

			return DatabaseOperations.delete(CommentModel, { id }, res);
		} catch (error: any) {
			return res
				.status(httpCode.INTERNAL_SERVER_ERROR)
				.json({ message: error.message || 'Unknown error occurred', details: error });
		}
	};

	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Get all Comments
	 */
	static getAllComments = async (req: Request, res: Response) => {
		try {
			const body: { postRef: string } = { postRef: req.body.postRef };

			const result = await CommentModel.find({ ...body });

			return res.status(httpCode.OK).json(result);
		} catch (error: any) {
			return res
				.status(httpCode.INTERNAL_SERVER_ERROR)
				.json({ message: error.message || 'Unknown error occurred', details: error });
		}
	};

	/**
	 *
	 * @param req express.Request
	 * @param res express.Response
	 * @description Get a Comment
	 */
	static getOneComment = async (req: Request, res: Response) => {
		try {
			const id: string = req.params.id;

			return DatabaseOperations.getOne(CommentModel, { id }, res);
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
			const id: string = req.params.id;
			const newPost: Comment = {
				userRef: req.body.id,
				postRef: req.body.postRef,
				description: req.body.description,
				timestamp: Date.now(),
			};

			return DatabaseOperations.update(CommentModel, { id, postRef: req.body.postRef }, newPost, res);
		} catch (error: any) {
			return res
				.status(httpCode.INTERNAL_SERVER_ERROR)
				.json({ message: error.message || 'Unknown Error Occurred', details: error });
		}
	};
}

export default CommentController;
