import connectToSession from "./connect-to-session";
import makeSession from "./make-session";
import sendSearch from "./send-search"
import {Server, Socket} from "socket.io";
import logger from "../loaders/logger";

export default function (server: Server) {
  server.on("connect", (socket: Socket) => {
    logger.debug("Socket Connected", {id: socket.id})
    socket.on("make-session", (data) => makeSession(socket, data));
    socket.on("connect-to-session", (data) => connectToSession(socket, data));
    socket.on("send-search", (data) => sendSearch(socket, data));

    socket.on("disconnect", () => {
      logger.debug("Socket Disconnected", {id: socket.id});
      socket.leaveAll();
    });
  });
}
