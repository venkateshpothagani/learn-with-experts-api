import router from '../utils/router';
import httpCode from '../utils/httpcodes';

router.get('/', (_req, res) => {
	return res.status(httpCode.ACCEPTED).json({ message: 'Welcome' });
});

export default router;
