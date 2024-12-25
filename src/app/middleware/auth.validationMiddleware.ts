

import  { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsysnc';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';


export const authValidationMidddleware = (...requiredRoles: TUserRole[]) => {

  return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {

        // Validate the request body
          const token = req.headers.authorization;

          // console.log(token);

          if (!token) {
              throw new AppError(
                  httpStatus.UNAUTHORIZED, 'You are not authorized'
              );
              
          }

          jwt.verify(token, config.jwt_access_token as string, function (err, decoded) { //decode information is coming from login service by jwt.sign() function
             if (err) {
              throw new AppError(
                  httpStatus.UNAUTHORIZED, 'You are not authorized'
                 )
             }
              
              
              //   console.log('from authMiddleware',decoded);
              const role = (decoded as JwtPayload).role;
              
              if (requiredRoles && !role) {
                  throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized from requiredRoles')
              }

              
              
              
              
            req.user = decoded as JwtPayload              
            next(); // Proceed to the next middleware/controller
        
          })
        
    
     
  
    })
}  
