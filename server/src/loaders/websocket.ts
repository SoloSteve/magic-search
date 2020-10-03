/*
Websocket Server Loader
=======================

Bootstrap the websocket server instance.
 */

import io from "socket.io";

export default (): io.Server => {
  return io({
    serveClient: false,
    cookie: false,
    transports: ["websocket", "polling"],
  });
}

