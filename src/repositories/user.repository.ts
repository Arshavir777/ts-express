import { BaseRepository } from "./base/base.repository";
import User, { IUser } from "../models/user.model";

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }
}
