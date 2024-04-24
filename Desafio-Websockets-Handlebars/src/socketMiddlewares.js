export function socketMiddlewares(socketServer, socketName) {
    return (req, res, next) => {
        req.socketServer = socketServer;
        next();
    };
}