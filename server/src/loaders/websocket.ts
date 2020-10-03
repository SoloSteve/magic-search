/*
Websocket Server Loader
=======================

Bootstrap the websocket server instance.
 */

import io from "socket.io";
import {Server} from "http";

export default (server: Server): io.Server => {
  return io(server, {
    serveClient: false,
    cookie: false,
    transports: ["websocket", "polling"],
  });
}

