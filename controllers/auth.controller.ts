import { Response, Request } from "express";

import User from "../interfaces/User.interface";
import httpCode from "../utils/httpcodes";

const signup = (req: Request, res: Response) => {
  const user: User = req.body;
  res.status(httpCode.OK).json(user);
};

const login = (req: Request, res: Response) => {
  const user: User = req.body;
  res.status(httpCode.OK).json(user);
};

const auth = { signup, login };

export default auth;
