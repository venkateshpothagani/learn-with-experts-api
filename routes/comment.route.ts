import { Router } from 'express';

const router = Router();
import authorize from '../middlewares/authorize.middleware';
import comment from '../controllers/comment.controller';

router.get('/:id', comment.getAllComments);
// router.get('/:id', comment.getOneComment);
router.post('/', authorize, comment.create);
router.delete('/:id', authorize, comment.remove);
router.put('/:id', authorize, comment.update);

export default router;
