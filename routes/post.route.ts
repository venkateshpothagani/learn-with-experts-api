import router from '../utils/router';
import authorize from '../middlewares/authorize.middleware';
import post from '../controllers/post.controller';

router.post('/create', authorize, post.create);
router.delete('/remove', authorize, post.remove);
router.get('/get', post.getFeed);
router.get('/get:id', post.getOne);
router.put('/update', authorize, post.update);

export default router;
