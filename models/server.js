const cors = require('cors');
const express = require('express');


const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            login: '/api/login',
            usuarios: '/api/usuarios',
            edificios: '/api/edificios',
            elementos: '/api/elementos'
        }
        this.conectarDB();

        this.middlewares();

        this.reoutes();

    }
    async conectarDB() {
        await dbConnection();
    }
    middlewares() {

        this.app.use(express.json());

    }
    reoutes() {
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.login, require('../routes/login'));
        this.app.use(this.paths.edificios, require('../routes/edificios'));
        this.app.use(this.paths.elementos, require('../routes/elementos'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto', this.port);
        });

    }
}


module.exports = Server;