const { createServer } = require('node:http');
const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');

const fruitsController = require('./controllers/fruits-controller');

// Add Controllers
router.use(fruitsController);


const hostname = 'localhost';
const port = 4203;

const envCorsURL = process.env.UI_CORS;

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: false,
    optionsSuccessStatus: 200
}

app.use('/', cors(corsOptions), router);

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});