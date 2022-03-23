import router from '../utils/router';
import authorize from '../middlewares/authorize.middleware';
import post from '../controllers/post.controller';

router.get('/', post.getFeed);
router.get('/:id', post.getOne);
router.post('/create', authorize, post.create);
router.delete('/remove', authorize, post.remove);
router.put('/update', authorize, post.update);

export default router;
