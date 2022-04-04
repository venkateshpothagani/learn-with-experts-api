import { Router } from 'express';

import authorize from '../middlewares/authorize.middleware';
import post from '../controllers/post.controller';

const router = Router();

router.post('/', authorize, post.create);
router.get('/', post.getFeed);
router.get('/:id', post.getOne);
router.delete('/:id', authorize, post.remove);
router.put('/:id', authorize, post.update);

export default router;
