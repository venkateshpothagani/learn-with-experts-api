import { Schema, model } from 'mongoose';

import Vote from '../interfaces/Vote.interface';

const VoteSchema: Schema<Vote> = new Schema({
	id: { type: String, required: true, unique: true },
	parentId: { type: String, required: true },
	type: { type: String, required: true },
	timestamp: { type: Number, required: true },
});
 
export default model('Vote', VoteSchema);
