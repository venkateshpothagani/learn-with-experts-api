import { Schema, model } from 'mongoose';

import Vote from '../interfaces/Vote.interface';

const VoteSchema: Schema<Vote> = new Schema({
	parentId: [
		{ type: Schema.Types.ObjectId, required: true, ref: 'Post' },
		{ type: Schema.Types.ObjectId, required: true, ref: 'Comment' },
	],
	type: { type: String, required: true, enum: ['upvote', 'downvote'] },
	timestamp: { type: Schema.Types.Date, required: true },
});

export default model('Vote', VoteSchema);
