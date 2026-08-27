import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.FRONTEND_URL || 'http://localhost:5173', methods: ['GET','POST'] } });
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (_req,res) => res.json({ success:true, service:'TripSync API', status:'healthy' }));
app.get('/api', (_req,res) => res.json({ success:true, message:'Welcome to TripSync API' }));

io.on('connection', socket => {
  socket.on('join-trip', tripId => socket.join(`trip:${tripId}`));
  socket.on('disconnect', () => {});
});

server.listen(PORT, () => console.log(`TripSync API running on port ${PORT}`));
