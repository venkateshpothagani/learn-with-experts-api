import { Model } from 'mongoose';
import { Response } from 'express';

import Comment from '../interfaces/Comment.interface';
import Post from '../interfaces/Post.interface';
import User from '../interfaces/User.interface';
import Vote from '../interfaces/Vote.interface';
import httpCode from './httpcodes';

class DatabaseOperations {
	/**
	 *
	 * @param model mongoose.Model<T>
	 * @param data Comment | User | Post | Vote
	 * @param res express.Response
	 * @returns res express.Response
	 * @description Creates document in database.
	 */
	static create = async (
		model: Model<Post> | Model<Comment> | Model<Post> | Model<Vote> | Model<User>,
		data: Comment | User | Post | Vote,
		res: Response
	) =>
		model
			.create(data)
			.then((result) => {
				return res.status(httpCode.CREATED).json({ message: 'Document saved successfully', data: result });
			})
			.catch((error) => {
				return res
					.status(httpCode.BAD_REQUEST)
					.json({ message: error.message || 'Unable to create document.', details: error });
			});

	/**
	 *
	 * @param model mongoose.Model<T>
	 * @param filter Object
	 * @param res express.Reponse
	 * @returns res express.Reponse
	 * @description Deletes documents which are matched with given filter.
	 */
	static delete = async (
		model: Model<Post> | Model<Comment> | Model<Post> | Model<Comment> | Model<User>,
		filter: any,
		res: Response
	) =>
		model
			.deleteOne(filter)
			.then((result) => {
				return res.status(httpCode.OK).json({ message: 'Document deleted successfully', data: result });
			})
			.catch((error) => {
				return res
					.status(httpCode.BAD_REQUEST)
					.json({ message: error.message || 'Unable to remove document.', details: error });
			});

	/**
	 *
	 * @param model mongoose.Model<T>
	 * @param filter Object
	 * @param res express.Reponse
	 * @returns res express.Reponse
	 * @description Gets a single document of given id.
	 */
	static getOne = async (
		model: Model<Post> | Model<Comment> | Model<Post> | Model<Comment> | Model<User>,
		filter: Object,
		res: Response
	) =>
		model
			.findOne(filter)
			.then((result) => {
				return res.status(httpCode.OK).json({ message: 'Document fetched successfully', data: result });
			})
			.catch((error) => {
				return res
					.status(httpCode.BAD_REQUEST)
					.json({ message: error.message || 'Unable to get document.', details: error });
			});

	/**
	 *
	 * @param model mongoose.Model<T>
	 * @param filter Object
	 * @param data Comment | User | Post | Vote,
	 * @param res express.Response
	 * @returns res express.Response
	 * @description Updates a document which is matched given filter.
	 */
	static update = async (
		model: Model<Post> | Model<Comment> | Model<Post> | Model<Comment> | Model<User>,
		filter: Object,
		data: Comment | User | Post | Vote,
		res: Response
	) =>
		model
			.updateOne(filter, data)
			.then((result) => {
				return res.status(httpCode.OK).json({ message: 'Document updated successfully', data: result });
			})
			.catch((error) => {
				return res
					.status(httpCode.BAD_REQUEST)
					.json({ error: { message: error.message || 'Unable to update document.', details: error } });
			});
}

export default DatabaseOperations;
