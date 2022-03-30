import { Schema } from 'mongoose';

interface User {
	id: string;
	username: string;
	fullName?: string;
	mail?: string;
	password: string;
	confirmPassword?: string;
	expertizeTech?: Schema.Types.Array;
	interestedTech?: Schema.Types.Array;
	description?: string;
	institution?: string;
	gender?: 'Male' | 'Female' | 'Other';
	languages?: Schema.Types.Array;
	phone?: string;
	address?: string;
}

export default User;
