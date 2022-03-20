import { Schema, model } from 'mongoose';

import Comment from '../interfaces/Comment.interface';

const CommentSchema: Schema<Comment> = new Schema({
	id: { type: String, required: true, unique: true },
	userId: { type: String, required: true },
	parentId: { type: String, required: true },
	type: { type: String, required: true },
	description: { type: String, required: true },
	timestamp: { type: Number, required: true },
});

export default model('Comment', CommentSchema);
