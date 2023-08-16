import express from 'express';
import cors from 'cors';
import './database.js';
import authMiddleware from './src/middlewares/auth.middleware.js';
import apiRouter from './src/api/router.js';

const server = express();
const port = process.env.PORT || 3000;

server.use(express.json());
server.use(cors({ origin: true }));
server.use(authMiddleware);
server.use(apiRouter);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
