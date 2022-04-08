import bycrypt from 'bcrypt';

import config from '../config/app.config';

class Bycrypt {
	/**
	 *
	 * @param password string
	 * @returns encrypted string
	 * @description Function encrypts password. Algorithm is SHA-256
	 *
	 */
	static async encryptPassword(password: string): Promise<string> {
		const salt = await bycrypt.genSalt(parseInt(config.auth.ENCRYPTION_ROUNDS));
		return bycrypt.hash(password, salt);
	}

	/**
	 * @param password string
	 * @param hash string
	 * @returns Promise<boolean>
	 * @description Function compares password with encrypted password
	 *
	 */
	static async comparePassword(password: string, hash: string): Promise<boolean> {
		return bycrypt.compare(password, hash);
	}
}

export default Bycrypt;
