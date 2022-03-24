import { Schema } from 'mongoose';

interface User {
	id?: Schema.Types.ObjectId;
	username: string;
	fullName?: string;
	mail?: string;
	password: string;
	confirmPassword?: string;
	expertizeTech?: string;
	interestedTech?: string;
	description?: string;
	institution?: string;
	gender?: string;
	languages?: string;
	phone?: string;
	address?: string;
}

export default User;
