import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
export interface IWrite<T> {
  create(item: T): Promise<T>;
  insertMany(items: T[]): Promise<T[]>;
  deleteOne(filter: FilterQuery<T>): Promise<any>;
  deleteMany(filter: FilterQuery<T>): Promise<any>;
  findOneAndUpdate(filter: FilterQuery<T>, item: UpdateQuery<T>): Promise<T>;
}

export interface IRead<T> {
  find(
    filter: FilterQuery<T>,
    select: string | null,
    options: QueryOptions | null
  ): Promise<T[]>;
  findOne(filter: FilterQuery<T>): Promise<T>;
  findById(id: string): Promise<T>;
}
