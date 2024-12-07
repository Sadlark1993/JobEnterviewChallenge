import express from 'express';
import cors from 'cors';
import transacao from './routes/transacao';

import { ppid } from 'node:process';

const app = express();

// trust first proxy of the chain and use its headers
app.set('trust proxy', 1);

// set cors to allow requests from any origin
app.use(cors());
app.use(express.json());
app.use('/api/transacao', transacao);

export default app;
