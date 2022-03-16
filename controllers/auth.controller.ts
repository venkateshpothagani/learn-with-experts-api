import { Response, Request } from "express";

import User from "../interfaces/User.interface";
import httpCode from "../utils/httpcodes";
import UserModel from "../models/User.model";

const signup = (req: Request, res: Response) => {
  const user: User = req.body;

  UserModel.create(user, (error, user) => {
    if (error) {
      res.status(httpCode.BAD_REQUEST).json(error);
    }
    res.status(httpCode.CREATED).json(user);
  });
};

const login = (req: Request, res: Response) => {
  const user: User = req.body;
  res.status(httpCode.OK).json(user);
};

const auth = { signup, login };

export default auth;
