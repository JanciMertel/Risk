function Socket(socket)
{
    this.socket = socket;
    this.socket.on('disconnect', this.onDisonnect);
}

Socket.prototype.onDisonnect = function()
{
    console.log('Socket disconnected');
}
