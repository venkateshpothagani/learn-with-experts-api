import router from '../utils/router';
import expert from '../controllers/expert.controller';
import authorize from '../middlewares/authorize.middleware';

router.get('/expert', expert.getFeed);
router.get('/expert/:id', authorize, expert.getOne);

export default router
