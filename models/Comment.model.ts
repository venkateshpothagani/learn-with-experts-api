import { Schema, model } from 'mongoose';

import Comment from '../interfaces/Comment.interface';

const CommentSchema: Schema<Comment> = new Schema({
	userRef: { type: String, ref: 'User' },
	postRef: { type: String, ref: 'Post' },
	description: { type: String },
	timestamp: { type: Schema.Types.Number },
});

export default model('Comment', CommentSchema);
