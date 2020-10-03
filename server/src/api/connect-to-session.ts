import io, {Socket} from "socket.io";
import logger from "../loaders/logger";

export default function connectToSession(socket: Socket, data: any) {
  const {sessionId} = data;

  if (!isSessionConnectable(socket.adapter.rooms, sessionId)) {
    socket.emit("session-taken");
    logger.info("User tried connecting to a taken session", {sessionId, id: socket.id});
    return;
  }

  // Join the session.
  socket.join(sessionId);
  socket.server.in(sessionId).emit("session-joined");
  logger.info("User connected to session", {sessionId, id: socket.id});
}

function isSessionConnectable(rooms: io.Rooms, sessionId: string): boolean {
  return rooms.hasOwnProperty(sessionId) && rooms[sessionId].length === 1;
}



