import express, { Express } from "express";
import * as bodyParser from "body-parser";

import authRoutes from "./routes/auth.route";
import config from "./config/app.config";
import dbConnect from "./utils/databaseConnect";

const app: Express = express();

app.use(bodyParser.json());

dbConnect(config.db.MONGODB_URI);

app.use("/auth", authRoutes);

app.listen(config.app.PORT, () => {
  console.log(`App listening on port ${config.app.PORT}`);
});

export default app;
