import dotenv from 'dotenv';

dotenv.config();

class AppConfig {
	static readonly PORT = process.env.PORT || 3000;
}

class DbConfig {
	static readonly MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learn-with-experts';
	static readonly REDIS_DB_URI = process.env.REDIS_DB_URI;
	static readonly REDIS_DB_USERNAME = process.env.REDIS_DB_USERNAME;
	static readonly REDIS_DB_PASSWORD = process.env.REDIS_DB_PASSWORD;
}

class AuthConfig {
	static readonly ENCRYPTION_ROUNDS = process.env.ENCRYPTION_ROUNDS || 10;
	static readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '7de19a40ec106d591';
	static readonly JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY || '9662c0d1390c99064534';
	static readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
	static readonly PASSWORD_PATTERN =
		process.env.PASSWORD_PATTERN || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
}

const Config = {
	app: AppConfig,
	db: DbConfig,
	auth: AuthConfig,
};
export default Config;
