import { Schema, model } from 'mongoose';

import Post from '../interfaces/Post.interface';

const PostSchema: Schema<Post> = new Schema({
	id: { type: String, required: true, unique: true },
	userRef: { type: String, required: true, ref: 'User' },
	type: { type: String, required: true },
	description: { type: String, required: true },
	timestamp: { type: Schema.Types.Date, required: true },
});

export default model('Post', PostSchema);
