/* Importing the express module. */
const express = require('express');
/* Creating a new instance of the express module. */
const app = express();
/* Importing the http module. */
const http = require('http');
/* Creating a server with the express app. */
const server = http.createServer(app);
/* Creating a new instance of the socket.io module. */
const io = require('socket.io')(server)
    /* Importing the cors module. */
const cors = require('cors');
/* Importing the default export from the axios module. */
const { default: axios } = require('axios');
/* Importing the websocket function from the socket.io-client module. */
const { io: websocket } = require("socket.io-client");

/* The WebSocket class is a wrapper for the socket.io library */
class WebSocket {
    constructor() {
        this.io = io
    }
    OnNewConnection(functions) {
        /* Creating a new connection with the server. */
        this.io.on("connection", (socket) => {
            this.socket = socket
            console.log("[Socket] => New Connection")
            functions(socket)

        })
    }
    OnDisconnect(functions) {
        /* Listening for a disconnection from the server. */
        this.socket.on("disconnect", (socket) => {
            console.log("[Socket] => Socket Disconnection")
            functions(socket)
        })
    }

}

/* A object that contains the functions that are used to create a server. */
const Server = {
    /* Creating a server. */
    Init: (port, uses) => {
        app.use(cors(uses))
        app.use(express.json())
        server.listen(port, () => {
            console.log('[Server] => Running on port : ' + port);
        })
    },
    /* Use a static directory for "/" page. */
    SrcDir: (dir) => {
        app.use(express.static(dir));
    },
    NewRoute: {
        Get: (route, functions) => {
            console.log('[Server] => Get Route : ' + route + ' is open!')
            app.get(route, (req, res) => {
                functions(req, res)
            })
        },
        Post: (route, functions) => {
            console.log('[Server] => Post Route : ' + route + ' is open!')
            app.post(route, (req, res) => {
                functions(req, res)
            })

        },
        Put: (route, functions) => {
            console.log('[Server] => Put Route : ' + route + ' is open!')
            app.put(route, (req, res) => {
                functions(req, res)
            })
        },
        Delete: (route, functions) => {
            console.log('[Server] => Delete Route : ' + route + ' is open!')
            app.delete(route, (req, res) => {
                functions(req, res)
            })
        }
    },
    Socket: () => {
        const Socket = new WebSocket()
        return Socket

    }

}


class Api {
    constructor(URl) {
        const Api = axios.create({
            baseURL: URl
        })
        this.Api = Api
    }

    Post(Route, Data, Response, IfCatch) {
        this.Api.post(Route, Data)
            .then(response => {
                Response(response.data)
            })
            .catch(error => {
                IfCatch(error)
            })

    }
    Get(Route, IfThen, IfCatch) {

        this.Api.get(Route)
            .then(response => {
                IfThen(response.data)

            })
            .catch(error => {
                IfCatch(error)

            })
    }
    Put(Route, Id, Update, Response, IfCatch) {
        let TotalRoute = `${Route}/${Id}`
        this.Api.put(TotalRoute, Update)
            .then(response => {
                Response(response.data)
            })
            .catch(error => {
                IfCatch(error)
            })

    }
    Delete(Route, Id, Response, IfCatch) {
        let TotalRoute = `${Route}/${Id}`
        this.Api.delete(TotalRoute)
            .then(response => {
                Response(response.data)
            })
            .catch(error => {
                IfCatch(error)
            })

    }

}

class ClientSocket {
    constructor(Route) {
        this.socket = websocket(Route)

    }
    emit(id, mensage) {
        this.socket.emit(id, mensage)
    }
    on(id, functions) {
        this.socket.on(id, (mensage) => {
            functions(mensage)
        })
    }

}

const Client = {
    Api: (URl) => {
        const API = new Api(URl)
        return API
    },
    Socket: (URl) => {
        const Socket = new ClientSocket(URl)
        return Socket
    },

}



module.exports = {
    Server,
    Client
}