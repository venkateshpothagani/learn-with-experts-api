import router from '../utils/router';
import authorize from '../middlewares/authorize.middleware';
import comment from '../controllers/comment.controller';

router.get('/', comment.getFeed);
router.get('/:id', comment.getOne);
router.post('/create', authorize, comment.create);
router.delete('/remove', authorize, comment.remove);
router.put('/update', authorize, comment.update);

export default router;
