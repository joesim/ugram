const events = (io) => {
    io.on("connection", (socket) => {
        socket.on('join', (data) => {
            console.log(`client connecté: ${socket.id}`)
            console.log(`token: ${data.accessToken}`)
        })
        socket.on('disconnect', (reason) => {
            console.log(`client déconnecté: ${socket.id}`);
        })
    })
    
}

export { events };