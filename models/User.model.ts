import { Schema, model } from 'mongoose';
import User from '../interfaces/User.interface';

const UserSchema: Schema<User> = new Schema({
	username: { type: String, unique: true, minlength: 6, maxlength: 30 },
	password: { type: String, minlength: 6 },
	interestedTech: { type: Schema.Types.Array },
	expertizedTech: { type: Schema.Types.Array },
	languages: { type: Schema.Types.Array },
	timestamp: { type: Schema.Types.Number },
	fullName: { type: String, required: false, minlength: 3, maxlength: 30 },
	mail: { type: String, required: false, maxlength: 50 },
	description: { type: String, required: false },
	institution: { type: String, required: false },
	gender: { type: String, required: false },
	phone: { type: String, required: false },
	address: { type: String, required: false },
});

export default model('User', UserSchema);
