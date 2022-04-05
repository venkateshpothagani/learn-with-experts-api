import { Schema } from 'mongoose';

interface Comment {
	userRef: Schema.Types.ObjectId;
	postRef: Schema.Types.ObjectId;
	description: Schema.Types.String;
	timestamp: number;
}

export default Comment;
