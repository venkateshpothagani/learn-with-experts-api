import { Schema } from 'mongoose';

interface Post {
	id: string;
	userRef: string;
	type: 'post' | 'question';
	description: string;
	tags: Schema.Types.Array;
	timestamp: Schema.Types.Date;
}

export default Post;
