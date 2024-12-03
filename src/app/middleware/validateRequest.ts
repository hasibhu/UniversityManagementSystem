
import { AnyZodObject } from 'zod';
import  { NextFunction, Request, Response } from 'express';


export const validateRequest = (schema: AnyZodObject) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        // Validate the request body
      try {
         await schema.parseAsync({
            body: req.body,
       });
        
        next(); // Proceed to the next middleware/controller
    
      } catch (error) {
        next(error)
      }
  
    };
}  
