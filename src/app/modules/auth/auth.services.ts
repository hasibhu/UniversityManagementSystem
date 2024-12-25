import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt  from "jsonwebtoken";
import config from "../../config";

const loginUserService = async (payload: TLoginUser) => {
    

    const user = await User.isUserExistByCustomId( payload?.id )

    // check if user is available before statics
    // const isUserExist = await User.findOne({ id: payload?.id })  // User means user model
    // if (!isUserExist) {
    //     throw new AppError(httpStatus.NOT_FOUND, "User is not available!!");  
    // }


    // after statics
    // console.log(User.isUserExistByCustomId(payload.id));
    
    //  if (! (await User.isUserExistByCustomId(payload.id))) {
     if (! user) {
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

    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_token as string,
        {
            expiresIn: '20d'
        }
    )








    return {
        accessToken,
        needPasswordChange: user?.needsPasswordChange
    }
}


export const AuthServices = {
    loginUserService,


}