require('dotenv').config();

const Server = require('./models/server');

const server = new Server();



server.middlewares();
server.listen();







// require('dotenv').config();

// const Server = require('./models/server');


// const server = new Server();



// server.middlewares();
// server.listen();