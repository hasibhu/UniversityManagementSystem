import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt'

const loginUserService = async (payload: TLoginUser) => {
    
    // check if user is available 
    const isUserExist = await User.findOne({ id: payload?.id })  // User means user model
    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User is not available!!");
        
    }

    // check if the user is deleted 
    const isUserDeleted = isUserExist?.isDeleted
    if (isUserDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, "User is deleted already!!");  
    }

    // check user status 
    const userStatus = isUserExist?.status === 'blocked'
    if (userStatus) {
        throw new AppError(httpStatus.FORBIDDEN, "User is blocked!!");
    }





    // checking if the password is correct 

    const isPasswordMatched = bcrypt.compare(payload.id, isUserExist?.password )
    


    return 
}


export const AuthServices = {
    loginUserService,


}