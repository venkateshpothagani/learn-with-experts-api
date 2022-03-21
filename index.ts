import express, { Express } from 'express';

import routes from './routes/app.route';
import config from './config/app.config';
import dbConnect from './utils/databaseConnect';
import cors from './middlewares/cors.middleware';

const app: Express = express();

app.use(express.json());
app.use(cors);

dbConnect(config.db.MONGODB_URI);

app.use('/api', routes);

app.listen(config.app.PORT, () => {
	console.log(`App listening on port ${config.app.PORT}`);
});

export default app;
