import { BaseRepository } from "./base/base.repository";
import User, { IUser } from "../models/user.model";
import { Service } from "typedi";

@Service()
export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }
}
