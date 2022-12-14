import express = require("express");
import  * as http from "http";
import * as path from "path";
import { Server, Socket } from "socket.io";

const port: number = 3000;
class App {
  private readonly server: http.Server;
  private readonly port: number;

  private io: Server;
  private clients: any = {}
  constructor(port: number) {
    this.port = port;
    const app = express();
    app.use(express.static(path.join(__dirname, '../client')));
    // This server.ts is only useful if you are running this on a production server or you
    // want to see how the production version of bundle.js works
    //
    // to use this server.ts
    // # npm run build        (this creates the production version of bundle.js and places it in ./dist/client/)
    // # tsc -p ./src/server  (this compiles ./src/server/server.ts into ./dist/server/server.js)
    // # npm start            (this starts node.js with express and serves the ./dist/client folder)
    //
    // visit http://127.0.0.1:3000
    this.server = new http.Server(app);

    this.io = new Server(this.server);
    this.io.on('connection',(socket: Socket) => {
      console.log(socket.constructor.name)
      this.clients[socket.id] = {};
      console.log(this.clients);
      console.log('a user connected: ' + socket.id);
      socket.emit('id', socket.id);

      socket.on('disconnect', () => {
        console.log('socket disconnected: '+ socket.id);
        if(this.clients && this.clients[socket.id]){
          console.log('deleting ' + socket.id);
          delete this.clients[socket.id];
          this.io.emit('removeClient', socket.id);
        }
      })

      socket.on('update', (message: any) => {
        if(this.clients[socket.id]){
          this.clients[socket.id].t = message.t // client timestamp
          this.clients[socket.id].p = message.p // position
          this.clients[socket.id].r = message.r //rotation
        }
      });
    })
    setInterval(() => {
      this.io.emit('clients: ', this.clients);
    }, 50)
  }

  public Start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    })
  }
}

new App(port).Start();
