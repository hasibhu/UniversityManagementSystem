

import  { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsysnc';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';


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

      const decoded = jwt.verify(token, config.jwt_access_token as string)as JwtPayload  //decode information is coming from login service by jwt.sign() function
             
              
      //   console.log('from authMiddleware',decoded);
      const { role, userId, iat  } = decoded;
      

      // check if the user exists 
      const user = await User.isUserExistByCustomId(userId)
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND,"User not found");
      }

      // check user status/ block /delete
      await User.isUserAccessibleById(userId);
      

      // check password change date and token generated date 
      if (user.passwordChangedAt && User.isJWTIssuedBeforeChange(user.passwordChangedAt, iat as number)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized.')
      }


      // check roles 
     if (requiredRoles && !role) {
              throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized from requiredRoles')
            }

              
      req.user = decoded as JwtPayload              
      next(); // Proceed to the next middleware/controller
        
          
                 
          
    
     
  
    })
}  
