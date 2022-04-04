import { Schema } from 'mongoose';

interface Post {
	userRef: Schema.Types.ObjectId;
	type: 'POST' | 'QUESTION';
	description: Schema.Types.String;
	tags: Schema.Types.Array;
	timestamp: number;
}

export default Post;
