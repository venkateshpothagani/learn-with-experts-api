import { Schema } from 'mongoose';

interface Comment {
	id?: Schema.Types.ObjectId;
	userId: Schema.Types.ObjectId;
	parentId: Schema.Types.ObjectId;
	type: 'answer' | 'comment' | 'reply';
	description: string;
	timestamp: Schema.Types.Date;
}

export default Comment;
