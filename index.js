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
/* Importing the file system module. */
const fs = require('fs');
const { table } = require('console');

var DB = {};

const config = {
    DB_PATH: "./DataBase",
    DB_BACKUP_PATH: "./Backup"
}

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
    Init: (port, functions, uses) => {
        app.use(cors(uses))
        app.use(express.json())
        server.listen(port, () => {
            console.log('[Server] => Running on port : ' + port);
            functions ? functions() : ""

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


const JsonServer = {
    /* A function that is setting the path of the DataBase. */
    path: (path) => {
        config.DB_PATH = path

    },

    /* A function that is setting the path of the Backup. */
    BackupPath: (path) => {
        config.DB_BACKUP_PATH = path

    },

    /* Creating a DataBase and saving it in a file. */
    InitDatabase: async(TimeInterval) => {
        await fs.readFile(config.DB_PATH + '/DataBase.json', 'utf8', (err, data) => {
            /* Creating a folder called DataBase. */
            if (err) {
                fs.mkdir(config.DB_PATH, {}, (err) => {
                    if (err) {
                        console.error(err);
                    } else /* Creating a file called DataBase.json in the DataBase folder. */ {
                        console.log("[DataBase] => Created successfully");
                        fs.writeFile(config.DB_PATH + '/DataBase.json', JSON.stringify(DB), (err) => {
                            if (err) console.error(err);
                        })
                    }
                })

            } else /* Loading the DataBase. */ {
                console.log("[DataBase] => Loaded successfully")
                DB = JSON.parse(data)
            }
            /* Update DataBase every Time-Interval seconds. */
            if (TimeInterval) {
                setInterval(() => {
                    fs.writeFile(config.DB_PATH + '/DataBase.json', JSON.stringify(DB), (err) => {
                        if (err) console.error(err);

                    })
                }, TimeInterval * 1000)
            }

        })
    },

    /* Creating a backup of the DataBase. */
    InitBackup: (TimeInterval) => {
        /* Reading the file Backup.json in the Backup folder. */
        fs.readFile(config.DB_BACKUP_PATH + '/Backup.json', 'utf8', (err, data) => {
            /* Reading the file Backup.json in the Backup folder. */
            if (err) {
                /* Creating a folder called Backup. */
                fs.mkdir(config.DB_BACKUP_PATH, {}, (err) => {

                    /* Checking if there is an error and if there is, it will print the error. */
                    if (err) {
                        console.error(err);
                    } else /* Creating a backup of the DataBase. */ {
                        console.log("Backup Initialization Successfully")
                        data = [DB]
                            /* Writing the data in the file Backup.json in the Backup folder. */
                        fs.writeFile(config.DB_BACKUP_PATH + '/Backup.json', JSON.stringify(data), (err) => {
                            if (err) console.error(err);
                        })
                    }
                })

            } else /* Loading the backup. */ {
                console.log("Backup Loaded Successfully")
                data = JSON.parse(data)

            }
            /* Creating a backup of the DataBase every TimeInterval seconds. */
            if (TimeInterval) {
                setInterval(() => {
                    console.log("New Backup Point Created")
                    data.push(DB)
                    fs.writeFile(config.DB_BACKUP_PATH + '/Backup.json', JSON.stringify(data), (err) => {
                        if (err) console.error(err);
                    })
                }, TimeInterval * 1000)
            }
        })

    },

    action: (functions) => {

        functions(DB)


    }


}



module.exports = {
    Server,
    Client,
    JsonServer
}