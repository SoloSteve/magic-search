import {program} from "commander";
import express from "express";
import http from "http";

import websocketLoader from "./loaders/websocket";
import logger from "./loaders/logger";
import websocketApi from "./api";

program.name("Magic Search");
program.description("Amaze people with your mind reading ability");
program.option("--serve <root-path>", "Enables the static file server at path", undefined);
program.option("--port <port>", "The server port", "1337");

program.parse(process.argv);


async function main(port: number, staticServe?: string) {
  const app = express();
  const server = http.createServer(app);
  if (staticServe) {
    app.use(express.static(staticServe));
  } else {
    logger.warn("Built-in file serving disabled");
  }
  const io = websocketLoader(server);
  websocketApi(io);
  server.listen(port);
  logger.info(`Started server on port ${port}`);
}

main(Number.parseInt(program.port), program.serve).then(() => {
  logger.debug("main ran successfully");
}).catch((e) => {
  logger.error("main threw an error", {
    error: e
  });
});
