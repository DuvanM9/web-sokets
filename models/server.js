const express = require("express");
require("colors");
const cors = require("cors");
const morgan = require("morgan");
const { socketConnection } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.path = {};

    // Middlwares
    this.middlewares();
    // Mis rutas
    this.routes();
    // concect socjets
    this.sockets();
    // cors proteger nuestra api para que solo reciba peticiones de cierto lugar
    // listas blancas y listas negras
  }


  middlewares() {
    // CORS
    this.app.use(cors());
    // Directorio publico
    this.app.use(express.static("public"));
    // responses
    this.app.use(morgan("dev"));
  }

  routes() {
    // this.app.use(this.path.auth, require("../routes/auth"));
  }

  sockets() {
    this.io.on('connection', socketConnection)
  }

  listen() {
    console.clear();
    this.server.listen(this.port, () => {
      console.log(` 🔥 Server in port ${this.port}`.bold);
    });
  }
}

module.exports = Server;
