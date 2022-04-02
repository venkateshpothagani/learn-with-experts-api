import { Schema, model } from 'mongoose';

import Comment from '../interfaces/Comment.interface';

const CommentSchema: Schema<Comment> = new Schema({
	userRef: { type: String, required: true, ref: 'User' },
	postRef: { type: String, required: true, ref: 'Post' },
	description: { type: String, required: true },
	timestamp: { type: Schema.Types.Date, required: true },
});

export default model('Comment', CommentSchema);
