import { Schema } from 'mongoose';

interface Comment {
	id: string;
	userRef: string;
	postRef: string;
	type: 'answer' | 'comment' | 'reply';
	description: string;
	upvote: number;
	downvote: number;
	timestamp: Schema.Types.Date;
}

export default Comment;
