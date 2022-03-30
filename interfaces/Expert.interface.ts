import { Schema } from 'mongoose';

interface Expert {
	id: string;
	username: string;
	fullName: string;
	mail: string;
	expertizeTech: Schema.Types.Array;
	interestedTech: Schema.Types.Array;
	description: string;
	languages: Schema.Types.Array;
}

export default Expert;
