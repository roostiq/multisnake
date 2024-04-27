import express from 'express';
import http from 'http';
import path from 'path';
import { setupWebSocketServer } from './websocket';

const app = express();
const server = http.createServer(app);

const staticPath = path.join(__dirname, '..', '..', 'client', 'dist');
app.use(express.static(staticPath));

setupWebSocketServer(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
