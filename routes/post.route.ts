import { Router } from 'express';

import authorize from '../middlewares/authorize.middleware';
import post from '../controllers/post.controller';

const router = Router();

router.get('/', post.getFeed);
router.get('/:id', post.getOne);
router.post('/create', authorize, post.create);
router.delete('/remove', authorize, post.remove);
router.put('/update', authorize, post.update);

export default router;
