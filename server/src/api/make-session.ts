import io, {Socket} from "socket.io";
import logger from "../loaders/logger";

export default function makeSession(socket: Socket, data: any) {
  const {sessionId} = data;

  if (doesSessionExist(socket.adapter.rooms, sessionId)) {
    socket.emit("session-exists");
    logger.info("User tried creating an existing session", {sessionId, id: socket.id});
    return;
  }

  if (doesAnotherSessionExist(socket, sessionId)) {
    socket.leaveAll();
  }

  // Create the session.
  socket.join(sessionId);
  socket.emit("session-created");
  logger.info("Session created", {sessionId, id: socket.id});
}

function doesSessionExist(rooms: io.Rooms, sessionId: string): boolean {
  return rooms.hasOwnProperty(sessionId);
}

function doesAnotherSessionExist(socket: Socket, sessionId: string): boolean {
  return Object.keys(socket.rooms).length > 1; // socket is always in its own room
}

