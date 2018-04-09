import * as Clients from '../controllers/clients';

const events = (io) => {
    io.on("connection", (socket) => {
        const socketId = socket.id;

        socket.on('join', (data) => Clients.connectClient(socketId, data))
        socket.on('disconnect', (reason) => Clients.disconnectClient(socketId))
    })
    
}

export { events };