import express from 'express';
import cors from 'cors';
import auth from './routes/usuario';
import transacao from './routes/transacao';
import recebivel from './routes/recebivel';

import { ppid } from 'node:process';
import notFound from './middleware/notFound';
import errorHandler from './middleware/error';

const app = express();

// trust first proxy of the chain and use its headers
app.set('trust proxy', 1);

// set cors to allow requests from any origin
app.use(cors());
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/transacao', transacao);
app.use('/api/saldos', recebivel);
app.use(notFound);
app.use(errorHandler)

export default app;
