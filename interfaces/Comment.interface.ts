interface Comment {
	id: string;
	userId: string;
	parentId: string;
	type: 'answer' | 'comment' | 'reply';
	description: string;
	upvoteCount?: number;
	downvoteCount?: number;
	timestamp: number;
}

export default Comment;
