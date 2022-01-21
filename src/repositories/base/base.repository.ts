import { FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { IRead, IWrite } from "../interfaces/index.interface";

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
  async find(
    filter: FilterQuery<T> = {},
    select: string | null = null,
    options: QueryOptions | null = {}
  ): Promise<T[]> {
    return this.model.find(filter, select, options);
  }
  async create(item: T): Promise<T> {
    return this.model.create(item);
  }
  async insertMany(items: T[]): Promise<T[]> {
    return this.model.insertMany(items);
  }
  async findOne(filter: FilterQuery<T>): Promise<T> {
    return this.model.findOne(filter);
  }
  async findById(id: string): Promise<T> {
    return this.model.findById(id);
  }
  async deleteOne(filter: FilterQuery<T>): Promise<any> {
    return this.model.deleteMany(filter);
  }
  async deleteMany(filter: FilterQuery<T>): Promise<any> {
    return this.model.deleteMany(filter);
  }
  async findOneAndUpdate(
    filter: FilterQuery<T>,
    item: UpdateQuery<T>,
    options: QueryOptions = { new: true }
  ): Promise<T> {
    return this.model.findOneAndUpdate(filter, item, options);
  }
}
