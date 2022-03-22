import { createClient } from 'redis';
import config from '../config/app.config';

const redis = createClient({
	url: config.db.REDIS_DB_URI,
	username: config.db.REDIS_DB_USERNAME,
	password: config.db.REDIS_DB_PASSWORD,
});

export default redis;
