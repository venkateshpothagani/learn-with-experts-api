import Redis from 'ioredis';
import config from '../config/app.config';

const redisClient = new Redis(parseInt(config.db.REDIS_PORT), config.db.REDIS_URI, {
	username: config.db.REDIS_USERNAME,
	password: config.db.REDIS_PASSWORD,
});



export default redisClient;
