import Tag from '../interfaces/Tag.interface';

import { Schema, model } from 'mongoose';

const TagSchema: Schema<Tag> = new Schema({
	postRef: { type: String, required: true, ref: 'Post' },
	name: { type: String, required: true },
});

export default model('Tag', TagSchema);
