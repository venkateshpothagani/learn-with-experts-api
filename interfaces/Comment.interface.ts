import { Schema } from 'mongoose';

interface Comment {
	userRef: Schema.Types.ObjectId;
	postRef: Schema.Types.ObjectId;
	type: 'answer' | 'comment' | 'reply';
	description: Schema.Types.String;
	timestamp: Schema.Types.Date;
}

export default Comment;
