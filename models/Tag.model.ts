import Tag from '../interfaces/Tag.interface';

import { Schema, model } from 'mongoose';

const TagSchema: Schema<Tag> = new Schema({
	id: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	postRef: { type: String, required: true, ref: 'Post' },
});

export default model('Tag', TagSchema);
