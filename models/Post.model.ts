import { Schema, model } from 'mongoose';

import Post from '../interfaces/Post.interface';

const PostSchema: Schema<Post> = new Schema({
	userId: { type: String, required: true },
	type: { type: String, required: true },
	description: { type: String, required: true },
	upvoteCount: { type: Number, required: true },
	downvoteCount: { type: Number, required: true },
	timestamp: { type: Number, required: true },
});

export default model('Post', PostSchema);
