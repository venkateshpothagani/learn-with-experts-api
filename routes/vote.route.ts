import router from '../utils/router';
import authorize from '../middlewares/authorize.middleware';
import vote from '../controllers/vote.controller';

router.post('/add', authorize, vote.addVote);
