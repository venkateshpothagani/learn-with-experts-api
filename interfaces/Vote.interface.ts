import { Schema } from 'mongoose';

interface Vote {
	id?: Schema.Types.ObjectId;
	parentId: Schema.Types.ObjectId;
	type: 'upvote' | 'downvote';
	timestamp: Schema.Types.Date;
}
export interface VoteCounter {
	upvotes: number;
	downvotes: number;
}

export default Vote;
