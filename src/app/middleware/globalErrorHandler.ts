
import { Request, Response, NextFunction } from 'express';

 const globalErrorHandle = (err: any, req: Request, res: Response, next: NextFunction) =>
{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  return res.status(statusCode).json({
    success: false,
    message,
    error: err ////next will bring the error from user controller file 
  })
}

export default globalErrorHandle