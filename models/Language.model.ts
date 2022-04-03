import Language from '../interfaces/Language.interface';

import { Schema, model } from 'mongoose';

const LanguageSchema: Schema<Language> = new Schema({
	id: { type: String, required: true, unique: true },
	name: {
		type: String,
		required: true,
		enum: ['Telugu', 'English', 'Hindi', 'Tamil', 'Malayalam', 'Spanish', 'Japanese'],
	},
	userRef: { type: String, required: true, ref: 'User' },
});

export default model('Language', LanguageSchema);
