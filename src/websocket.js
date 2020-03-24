const socketio = require("socket.io");
const parseArray = require("./utils/ParseToArray");
const calculateDistance = require("./utils/calculateDistance");
const connections = [];
let io;
exports.setupWebsocket = server => {
  io = socketio(server);
  io.listen(4001);
  io.on("connection", socket => {
    const { latitude, longitute, techs } = socket.handshake.query;
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitute: Number(longitute)
      },
      techs: parseArray(techs)
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(conn => {
    return (
      calculateDistance(coordinates, conn.coordinates) < 10 &&
      conn.techs.some(item => techs.include(items))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
