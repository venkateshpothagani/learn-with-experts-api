import { Schema, model } from "mongoose";
import User from "../interfaces/User.interface";

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 30,
  },
  password: { type: String, required: true, minlength: 6 },
  personalName: { type: String, required: false, minlength: 3, maxlength: 30 },
  mail: {
    type: String,
    required: false,
    unique: true,
    maxlength: 50,
  },
  expertizeTech: { type: String, required: false },
  interestedTech: {
    type: String,
    required: false,
  },
  description: { type: String, required: false },
  institution: { type: String, required: false },
  gender: { type: String, required: false },
  languages: { type: String, required: false },
  phone: { type: String, required: false },
  address: { type: String, required: false },
});

const UserModel = model("User", UserSchema);

export default UserModel;
