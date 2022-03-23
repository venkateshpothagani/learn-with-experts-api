import { Schema } from 'mongoose';

interface Expert {
	id?: Schema.Types.ObjectId;
	username: string;
	personalName: string;
	mail: string;
	expertizeTech: string;
	interestedTech: string;
	description: string;
	languages: string;
}

export default Expert;
