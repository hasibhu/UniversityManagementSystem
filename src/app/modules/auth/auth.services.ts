// import { User } from './../user/user.model';
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload }  from "jsonwebtoken";
import config from "../../config";
import bcrypt from 'bcrypt'
import { createToken } from "./auth.utils";

const loginUserService = async (payload: TLoginUser) => {
    

    const user = await User.isUserExistByCustomId(payload?.id)

    // console.log(user);

    // check if user is available before statics
    // const isUserExist = await User.findOne({ id: payload?.id })  // User means user model
    // if (!isUserExist) {
    //     throw new AppError(httpStatus.NOT_FOUND, "User is not available!!");  
    // }


    // after statics
    // console.log(User.isUserExistByCustomId(payload.id));
    
    //  if (! (await User.isUserExistByCustomId(payload.id))) {
    
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User is not available!!");
    }
    //  statics ends


    // before statics
    // check if the user is deleted before statics
    // const isUserDeleted = isUserExist?.isDeleted
    // if (isUserDeleted) {
    //     throw new AppError(httpStatus.FORBIDDEN, "User is deleted already!!");
    // }
    
    // check user status
    // const userStatus = isUserExist?.status === 'blocked'
    // if (userStatus) {
    //     throw new AppError(httpStatus.FORBIDDEN, "User is blocked!!");
    // }

    // after using statics // using statics 
    await User.isUserAccessibleById(payload.id);




    // checking if the password is correct matching with db
    // const isPasswordMatched = bcrypt.compare(payload.id, isUserExist?.password )
    
    if (!(await User.isPasswordMatched(payload.password, user?.password))) {
        throw new AppError(httpStatus.NOT_FOUND, "Password does not match!!");
    }




    // apply jwt 

    const jwtPayload = {
        userId: user?.id,
        role: user?.role
    }

    // access token generate 
    // const accessToken = jwt.sign(
    //     jwtPayload,
    //     config.jwt_access_token as string,
    //     {
    //         expiresIn: '20d'
    //     }
    // )


    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_token as string,
        config.jwt_accress_expiresIn as string
    )


    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_token as string,
        config.jwt_refresh_expiresIn as string,
        
    )


    return {
        accessToken,
        refreshToken,
        needPasswordChange: user?.needsPasswordChange
    }
};




const changePasswordService = async(user:JwtPayload, payload:{oldPassword: string, newPassword: string}) => {
    
    const isUser = await User.isUserExistByCustomId(user?.userId)

    if (!isUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User is not available!!");
    }
   
    // after using statics // using statics 
    await User.isUserAccessibleById(user?.id); //from user model file

    if (!(await User.isPasswordMatched(payload.oldPassword, isUser?.password))) {
        throw new AppError(httpStatus.NOT_FOUND, "Password does not match!!");
    }



    const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds))



    await User.findOneAndUpdate(
        { id: user.userId, role: user.role },
        {
          password: newHashedPassword,
          needsPasswordChange: false,
          passwordChangedAt: new Date()
        }

        
    )

    return null;
}



const refreshToken = async(token: string) => {

         

      const decoded = jwt.verify(token, config.jwt_refresh_token as string)as JwtPayload  //decode information is coming from login service by jwt.sign() function
             
              
      //   console.log('from authMiddleware',decoded);
      const { userId, iat  } = decoded;
      

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
    
    
    
    const jwtPayload = {
        userId: user?.id,
        role: user?.role
    }



    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_token as string,
        config.jwt_accress_expiresIn as string
    )


    // const refreshToken = createToken(
    //     jwtPayload,
    //     config.jwt_refresh_token as string,
    //     config.jwt_refresh_expiresIn as string,
        
    // )

    return {
        accessToken
    }
}




const forgetPassword = async(userId: string) => {
    

     // check if the user exists 
      const user = await User.isUserExistByCustomId(userId)
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND,"User not found");
      }

      // check user status/ block /delete
      await User.isUserAccessibleById(userId);
      
    
    
    const jwtPayload = {
        userId: user?.id,
        role: user?.role
    }



    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_token as string,
        '10m'
    )


     const resetUrlLink = `http://localhost:8000?id=${user.id}token=${accessToken}`
    
    console.log(resetUrlLink);

    // return resetUrlLink
}


export const AuthServices = {
    loginUserService,
    changePasswordService,
    refreshToken,
    forgetPassword


}