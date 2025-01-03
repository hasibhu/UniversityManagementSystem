/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { TErrorSource } from '../interface/error.interface';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleMongooseValidationError from '../errors/handleMongooseValidatinError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';



const globalErrorHandle: ErrorRequestHandler = (err, req, res, next) => {
   
   let statusCode = 500;
   let message = err.message || 'Something went wrong';
   
   let errorSources: TErrorSource = [{
     path: '',
     message: "Something went wrong from errorSources"
   }];

  //  to check if the error is coming from zod 
   if (err instanceof ZodError) {
    
     const simplifiedError = handleZodError(err);
    //  console.log(simplifiedError);

     statusCode = simplifiedError?.statusCode;
     message = simplifiedError?.message;
     errorSources = simplifiedError?.errorSources

    //  message= 'I am a zod errro'
   } else if (err?.name === "ValidationError") {
     const simplifiedError = handleMongooseValidationError(err);
     
     statusCode = simplifiedError?.statusCode;
     message = simplifiedError?.message;
     errorSources = simplifiedError?.errorSources

   } else if (err?.name === 'CastError') {  
    const simplifiedError = handleCastError(err);
     
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources
    
   } else if (err instanceof AppError) {
     statusCode = err?.statusCode;
    message = err?.message;
     errorSources = [
       {
         path: '',
         message: err?.message
      }
    ]
   }



   return res.status(statusCode).json({
    //if there is an error, the below format will be shown in the error message 
    success: false,
    message,
    errorSources,
    // err //to check error properties 
     // zodError: err ////next will bring the error from user controller file ; this is zod error; zodError is mutable name
    
     // optional statck
    
     // stack : err?.stack
    
    //  stack: config.NODE_ENV === "development" ? err?.stack : null
  })
   
   
}

export default globalErrorHandle









































// basic error handler 
// import { ErrorRequestHandler } from 'express';
// import { TErrorSource } from '../interface/error.interface';



//  const globalErrorHandle : ErrorRequestHandler = (err, req, res, next) =>
//  {
   
//   const statusCode = 500;
//    const message = err.message || 'Something went wrong';
   

//   return res.status(statusCode).json({
//     success: false,
//     message,
//      error: err ////next will bring the error from user controller file 
//   })
// }

// export default globalErrorHandle