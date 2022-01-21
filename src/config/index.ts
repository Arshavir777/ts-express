import { IConfigApp } from "./types";

export const config: IConfigApp = {
  port: +(process.env.SERVER_PORT ?? 3000),
  mongoDbUri: process.env.MONGO_DB_URI ?? "",
  jwt: {
    secret: process.env.JWT_TOKEN_SECRET ?? "secret123",
    expiresIn: 3600,
  },
};
