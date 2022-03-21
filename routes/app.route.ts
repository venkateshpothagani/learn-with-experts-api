import router from '../utils/router';
import httpCode from '../utils/httpcodes';
import authRoutes from './auth.route';
import commentRoutes from './comment.route';
import expertRoutes from './experts.route';
import postRoutes from './post.route';
import voteRoutes from './vote.route';

router.get('/', (_req, res) => {
	return res.status(httpCode.ACCEPTED).json({ message: 'Welcome' });
});
router.use('/auth', authRoutes);
router.use('/comment', commentRoutes);
router.use('/expert', expertRoutes);
router.use('/post', postRoutes);
router.use('/vote', voteRoutes);

export default router;
