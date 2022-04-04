import { Schema, model } from 'mongoose';

import Post from '../interfaces/Post.interface';

enum PostType {
	POST = 'POST',
	QUESTION = 'QUESTION',
}

const PostSchema: Schema<Post> = new Schema({
	userRef: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	type: { type: String, required: true, enum: PostType, default: PostType.POST },
	description: { type: String, required: true },
	tags: { type: Schema.Types.Array, required: true },
	timestamp: { type: Schema.Types.Number, required: true },
});

export default model('Post', PostSchema);
