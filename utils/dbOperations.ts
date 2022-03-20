import { Model } from 'mongoose';
import { Response } from 'express';

import Comment from '../interfaces/Comment.interface';
import Post from '../interfaces/Post.interface';
import User from '../interfaces/User.interface';
import Vote from '../interfaces/Vote.interface';
import httpCode from './httpcodes';

/**
 * @description Class with static method to perform action on database
 *
 */
class DatabaseOperations {
	/**
	 *
	 * @param model mongoose.Model<T>
	 * @param data Comment | User | Post | Vote
	 * @param res express.Response
	 * @returns None
	 * @description Method to create document in database.
	 */
	static create = async (
		model: Model<Post> | Model<Comment> | Model<Post> | Model<Vote> | Model<User>,
		data: Comment | User | Post | Vote,
		res: Response
	) =>
		model
			.create(data)
			.then((result) => {
				return res.status(httpCode.CREATED).json(result);
			})
			.catch((error) => {
				return res.status(httpCode.BAD_REQUEST).json(error);
			});

	/**
	 *
	 * @param model mongoose.Model<T>
	 * @param filter Object
	 * @param res express.Reponse
	 * @returns None
	 * @description Method to delete documents which are matched with given filter.
	 */
	static delete = async (
		model: Model<Post> | Model<Comment> | Model<Post> | Model<Comment> | Model<User>,
		filter: Object,
		res: Response
	) =>
		model
			.remove(filter)
			.then((result) => {
				return res.status(httpCode.ACCEPTED).json(result);
			})
			.catch((error) => {
				return res.status(httpCode.BAD_REQUEST).json(error);
			});

	/**
	 *
	 * @param model mongoose.Model<T>
	 * @param filter Object
	 * @param res express.Reponse
	 * @returns None
	 * @description Method to get a single document of given id.
	 */
	static getOne = async (
		model: Model<Post> | Model<Comment> | Model<Post> | Model<Comment> | Model<User>,
		filter: Object,
		res: Response
	) =>
		model
			.findOne(filter)
			.then((result) => {
				return res.status(httpCode.ACCEPTED).json(result);
			})
			.catch((error) => {
				return res.status(httpCode.BAD_REQUEST).json(error);
			});

	/**
	 *
	 * @param model mongoose.Model<T>
	 * @param filter Object
	 * @param data Comment | User | Post | Vote,
	 * @param res express.Response
	 * @returns None
	 * @description Method to update a document which is matched given filter.
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
				return res.status(httpCode.ACCEPTED).json(result);
			})
			.catch((error) => {
				return res.status(httpCode.BAD_REQUEST).json(error);
			});
}

export default DatabaseOperations;
