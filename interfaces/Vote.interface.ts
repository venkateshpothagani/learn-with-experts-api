interface Vote {
	id: string;
	parentId: string;
	type: 'upvote' | 'downvote';
	timestamp: number;
}
export interface VoteCounter {
	upvotes: number;
	downvotes: number;
}

export default Vote;
