import { Router } from "express";

const router = Router();
import expert from '../controllers/expert.controller';
import authorize from '../middlewares/authorize.middleware';

router.get('/', expert.getFeed);
router.get('/:id', authorize, expert.getOne);

export default router
