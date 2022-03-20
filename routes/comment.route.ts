import router from '../utils/router';
import authorize from '../middlewares/authorize.middleware';
import comment from '../controllers/comment.controller';

router.post('/create', authorize, comment.create);
router.delete('/remove', authorize, comment.remove);
router.get('/get', comment.getFeed);
router.get('/get:id', comment.getOne);
router.put('/update', authorize, comment.update);

export default router;
