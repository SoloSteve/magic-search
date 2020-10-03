import {Socket} from "socket.io";
import logger from "../loaders/logger";

export default function sendSearch(socket: Socket, data: any) {
  const {text} = data;

  const sessionId = Object.values(socket.rooms)[1];

  socket.to(sessionId).emit("execute-search", text);

  logger.info("Search has been executed", {sessionId, text});
}

