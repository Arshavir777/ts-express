export interface IConfigApp {
  port: number;
  mongoDbUri: string;
  jwt: {
    secret: string;
    expiresIn: number;
  };
}
