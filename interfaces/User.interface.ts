import { Schema } from 'mongoose';

interface User {
	username: string;
	password: string;
	confirmPassword: string;
	interestedTech: Schema.Types.Array;
	expertizedTech: Schema.Types.Array;
	languages: Schema.Types.Array;
	fullName?: string;
	mail?: string;
	description?: string;
	institution?: string;
	gender?: string;
	phone?: string;
	address?: string;
}

export default User;
