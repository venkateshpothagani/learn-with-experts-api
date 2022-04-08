import { Router } from 'express';
import httpCode from '../utils/httpcodes';

const router = Router();

router.get('/', (_req, res) => {
	return res.status(httpCode.ACCEPTED).json({ message: 'Welcome' });
});

export default router;
