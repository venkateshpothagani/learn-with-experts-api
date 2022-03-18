import { Request, Response } from 'express';

import router from '../utils/router';
import authorize from '../middlewares/authorize.middleware';

router.get('/', (_req: Request, _res: Response) => {});

router.post('/create', authorize, (req: Request, res: Response) => {
	res.json({ req: req.body });
});

export default router;
