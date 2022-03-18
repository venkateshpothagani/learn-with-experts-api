import { Schema, model } from 'mongoose';

import Token from '../interfaces/Token.interface';

const RefreshTokenSchema: Schema<Token> = new Schema({
	username: {
		type: String,
		required: true,
	},
	refreshToken: {
		type: String,
		unique: true,
		required: true,
	},
});

export default model('RefreshTokenSchema', RefreshTokenSchema);
