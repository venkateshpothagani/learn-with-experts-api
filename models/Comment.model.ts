import { Schema, model } from 'mongoose';

import Comment from '../interfaces/Comment.interface';

const CommentSchema: Schema<Comment> = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	parentId: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
	type: { type: String, required: true },
	description: { type: String, required: true },
	timestamp: { type: Schema.Types.Date, required: true },
});

export default model('Comment', CommentSchema);
