import { Router } from 'express';

import authorize from '../middlewares/authorize.middleware';
import vote from '../controllers/vote.controller';

const router = Router();

router.post('/', authorize, vote.updateVote);

export default router;
