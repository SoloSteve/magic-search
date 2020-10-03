import websocketLoader from "./loaders/websocket";
import logger from "./loaders/logger";
import websocketApi from "./api";


async function main() {
  const websocketServer = websocketLoader();
  websocketApi(websocketServer);
  websocketServer.listen(1337);
  logger.info("Started server on port 1337");
}

main().then(() => {
  logger.debug("main ran successfully");
}).catch((e) => {
  logger.error("main threw an error", {
    error: e
  });
});
