import * as Clients from "../controllers/clients";

const events = (io) => {
  io.on("connection", socket => {
    const socketId = socket.id;

    socket.on("join", data => Clients.connectClient(socketId, data));
    socket.on("disconnect", () => Clients.disconnectClient(socketId));
  });
};

export default events;
