import express from 'express';
import CustomError from '../util/CustomError';

const notFound = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error = new CustomError('Error 404. Not found.');
  error.status = 404;
  next(error);
}

export default notFound;