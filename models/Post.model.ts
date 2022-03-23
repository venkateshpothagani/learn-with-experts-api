import { Schema, model } from 'mongoose';

import Post from '../interfaces/Post.interface';

const PostSchema: Schema<Post> = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	type: { type: String, required: true },
	description: { type: String, required: true },
	timestamp: { type: Schema.Types.Date, required: true },
});

export default model('Post', PostSchema);
