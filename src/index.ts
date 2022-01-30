import { BootstrapApplication, TApplicationConfig } from "./application";
import http from "http";

const config = {
  port: +(process.env.PORT || 3000),
  host: process.env.HOST || "0.0.0.0",
};

export async function main(options: TApplicationConfig) {
  const app = new BootstrapApplication(options);
  app.boot();
  const server: http.Server = http.createServer(app.getInstance());
  await app.start(server);
}

main(config);
