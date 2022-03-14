import express, { Express } from "express";
import * as bodyParser from "body-parser";

import authRoutes from "./routes/auth.route";

import config from "./config/app.config";

const app: Express = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.listen(config.app.port, () => {
  console.log(`App listening on port ${config.app.port}`);
});
