import Technology from '../interfaces/Technology.interface';

import { Schema, model } from 'mongoose';

const TechnologySchema: Schema<Technology> = new Schema({
	name: { type: Schema.Types.String, required: true },
	isInterested: { type: Schema.Types.Boolean, required: true },
	isExpertized: { type: Schema.Types.Boolean, required: true },
	userRef: { type: Schema.Types.String, required: true },
});

export default model('Technology', model(TechnologySchema));
