import { Schema } from 'mongoose';

interface Post {
	userRef: Schema.Types.ObjectId;
	type: 'post' | 'question';
	description: Schema.Types.String;
	tags: Schema.Types.Array;
	timestamp: Schema.Types.Date;
}

export default Post;
