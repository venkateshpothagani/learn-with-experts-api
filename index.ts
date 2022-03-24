import express, { Express } from 'express';

import appRoutes from './routes/app.route';
import authRoutes from './routes/auth.route';
import commentRoutes from './routes/comment.route';
import expertRoutes from './routes/experts.route';
import postRoutes from './routes/post.route';
import voteRoutes from './routes/vote.route';
import config from './config/app.config';
import dbConnect from './utils/databaseConnect';
import cors from './middlewares/cors.middleware';

const app: Express = express();

app.use(express.json());
app.use(cors);

dbConnect(config.db.MONGODB_URI);

app.use('/api', appRoutes);
app.use('/api/user', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/expert', expertRoutes);
app.use('/api/vote', voteRoutes);

app.listen(config.app.PORT, () => {
	console.log(`App listening on port ${config.app.PORT}`);
});

export default app;
