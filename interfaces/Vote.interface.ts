import { Schema } from 'mongoose';

interface Vote {
	id: string;
	userRef: string;
	postAndCommentRef: string;
	type: string;
	timestamp: Schema.Types.Date;
}
export interface VoteCounter {
	upvotes: number;
	downvotes: number;
}

export default Vote;
