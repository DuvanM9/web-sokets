const socketConnection = (socket) => {
    
    console.log('Cliente conectado ' + socket.id)

    socket.on('disconnect', () => {
        console.log('Cliente decontectado ' + socket.id)
    })

    // Escuchar mensaje
    socket.on('send-message', (payload, callback) => {
        // Emitir mensaje
        socket.broadcast.emit('send-message', { ...payload, id: socket.id })
        callback(socket.id)

    })

}

module.exports = {socketConnection}