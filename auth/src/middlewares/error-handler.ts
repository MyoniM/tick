import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../errors/custom-error';

export const errorHandler = (error: Error, _: Request, res: Response, __: NextFunction) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send({
      errors: error.serializeErrors(),
    });
  }

  res.status(400).send({
    errors: 'formattedErrors',
  });
};
