
import { AnyZodObject } from 'zod';
import  { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsysnc';


export const validateRequest = (schema: AnyZodObject) => {

  return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {

        // Validate the request body
  
         await schema.parseAsync({
           body: req.body,
           cookies: req.cookies,
       });
        
        next(); // Proceed to the next middleware/controller
    
     
  
    }
    )
}  
