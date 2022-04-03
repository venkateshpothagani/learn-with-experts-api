import { Schema, model } from 'mongoose';

import Vote from '../interfaces/Vote.interface';

const VoteSchema: Schema<Vote> = new Schema({
	id: { type: String, required: true, unique: true },
	postAndCommentRef: [
		{ type: String, required: true, ref: 'Post' },
		{ type: String, required: true, ref: 'Comment' },
	],
	userRef: { type: String, required: true, ref: 'User' },
	type: { type: String, required: true, enum: ['upvote', 'downvote'] },
	timestamp: { type: Schema.Types.Date, required: true },
});

export default model('Vote', VoteSchema);
