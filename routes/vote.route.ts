import { Router } from 'express';

import authorize from '../middlewares/authorize.middleware';
import vote from '../controllers/vote.controller';

const router = Router();

router.post('/add', authorize, vote.addVote);

export default router;
