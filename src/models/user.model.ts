import { Model, model, Schema } from "mongoose";
import crypto from "crypto";

/**
 * Interface to model the User Schema for TypeScript.
 * @param login:string
 * @param email:string
 * @param password:string
 * @param registerDate:string
 */
export interface IUser {
  _id?: string;
  login: string;
  email: string;
  password: string;
  registerDate?: string;
  checkPassword?: (password: string) => boolean;
}

const UserSchema: Schema = new Schema<IUser, Model<IUser>>({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registerDate: {
    type: String,
  },
});

UserSchema.pre("save", async function (next) {
  this.password = crypto.createHash("md5").update(this.password).digest("hex");
  this.registerDate = new Date();
  next();
});

UserSchema.methods.checkPassword = function (password: string) {
  return (
    this.password === crypto.createHash("md5").update(password).digest("hex")
  );
};

const User: Model<IUser> = model("User", UserSchema);

export default User;
