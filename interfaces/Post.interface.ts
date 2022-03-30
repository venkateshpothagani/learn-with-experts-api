import { Schema } from 'mongoose';

interface Post {
	id: string;
	userId: string;
	type: 'post' | 'question';
	description: string;
	tags: Schema.Types.Array;
	timestamp: Schema.Types.Date;
}

export default Post;
