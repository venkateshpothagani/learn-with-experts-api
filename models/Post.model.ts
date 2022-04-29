import { Schema, model } from 'mongoose';

import Post from '../interfaces/Post.interface';

enum PostType {
	POST = 'POST',
	QUESTION = 'QUESTION',
}

const PostSchema: Schema<Post> = new Schema({
	userRef: { type: Schema.Types.ObjectId, ref: 'User' },
	type: { type: String, enum: PostType, default: PostType.POST },
	description: { type: String, default: "Server didn't get description from client" },
	tags: { type: Schema.Types.Array },
	timestamp: { type: Schema.Types.Number },
});

export default model('Post', PostSchema);
