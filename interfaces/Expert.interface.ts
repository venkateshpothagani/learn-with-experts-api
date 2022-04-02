import { Schema } from 'mongoose';

interface Expert {
	id: string;
	username: string;
	fullName: string;
	mail: string;
	description: string;
	languages: Schema.Types.Array;
}

export default Expert;
