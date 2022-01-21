import { FilterQuery, Model } from "mongoose";
import { IRead, IWrite } from "../interfaces/index.interface";

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
  async find(filter: FilterQuery<T>): Promise<T[]> {
    return await this.model.find(filter);
  }
  async create(item: T): Promise<T> {
    return await this.model.create(item);
  }
  async findOne(filter: FilterQuery<T>): Promise<T> {
    return await this.model.findOne(filter);
  }
  async findById(id: string): Promise<T> {
    return await this.model.findById(id);
  }
  update(id: string, item: T): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
