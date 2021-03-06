import { IConfigApp } from "./types";

export const config: IConfigApp = {
  port: +(process.env.PORT ?? 3000),
  mongoDbUri: process.env.MONGO_DB_URI ?? "",
  jpApiBase: 'http://jsonplaceholder.typicode.com',
  jwt: {
    secret: process.env.JWT_TOKEN_SECRET ?? "secret123",
    expiresIn: 3600,
  },
};
