import { Schema } from 'mongoose';

interface Comment {
	id: string;
	userId: string;
	parentId: string;
	type: 'answer' | 'comment' | 'reply';
	description: string;
	timestamp: Schema.Types.Date;
}

export default Comment;
