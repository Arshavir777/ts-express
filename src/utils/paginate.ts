import { Request } from "express";

export interface IPaginateParams {
  limit?: number;
  page?: number;
  skip?: number;
}

export function paginate(req: Request) {
  const { limit, page } = req.query;
  const options: IPaginateParams = {};

  if (limit) {
    options.limit = +limit;
  }

  if (page) {
    options.skip = (+page - 1) * +limit;
  }

  return options;
}
