import Redis from 'ioredis';
import config from '../config/app.config';

const redis = new Redis(parseInt(config.db.REDIS_PORT), config.db.REDIS_URI, {
	username: config.db.REDIS_USERNAME,
	password: config.db.REDIS_PASSWORD,
});

console.log('\n===========Connected to Redis===========\n');

export default redis;
