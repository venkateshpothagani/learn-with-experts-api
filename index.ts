import express, { Express } from 'express';

import authRoutes from './routes/auth.route';
import postRoutes from './routes/post.route';
import config from './config/app.config';
import dbConnect from './utils/databaseConnect';
import cors from './middlewares/cors.middleware';

const app: Express = express();

app.use(express.json());
app.use(cors);

dbConnect(config.db.MONGODB_URI);

app.use('/auth', authRoutes);
app.use('/post', postRoutes);

app.listen(config.app.PORT, () => {
	console.log(`App listening on port ${config.app.PORT}`);
});

export default app;
