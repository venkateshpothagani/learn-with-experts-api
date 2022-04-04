import { Schema, model } from 'mongoose';
import User from '../interfaces/User.interface';

const UserSchema: Schema<User> = new Schema({
	username: { type: String, required: true, unique: true, minlength: 6, maxlength: 30 },
	password: { type: String, required: true, minlength: 6 },
	interestedTech: { type: Schema.Types.Array, required: true },
	expertizedTech: { type: Schema.Types.Array, required: true },
	languages: { type: Schema.Types.Array, required: true },
	fullName: { type: String, required: false, minlength: 3, maxlength: 30 },
	mail: { type: String, required: false, maxlength: 50 },
	description: { type: String, required: false },
	institution: { type: String, required: false },
	gender: { type: String, required: false },
	phone: { type: String, required: false },
	address: { type: String, required: false },
});

export default model('User', UserSchema);
