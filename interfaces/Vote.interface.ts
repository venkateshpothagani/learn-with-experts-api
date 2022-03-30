import { Schema } from 'mongoose';

interface Vote {
	id: string;
	userRef: string;
	postRef: string;
	type: Schema.Types.Array;
	timestamp: Schema.Types.Date;
}
export interface VoteCounter {
	upvotes: number;
	downvotes: number;
}

export default Vote;
