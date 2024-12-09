import express from 'express';

interface CustomError extends Error {
  status?: number;
}

const errorHandler = (
  err: CustomError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction) => {
  if (err.status) {
    return res.status(err.status).json({ msg: err.message });
  }
  res.status(500).json({ msg: err.message });
}

export default errorHandler;