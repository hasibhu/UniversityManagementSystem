import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsysnc";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";




const loginUser = catchAsync(async (req, res) => {
    

    const result = await AuthServices.loginUserService(req.body)

    const { refreshToken, accessToken, needPasswordChange } = result;

    // set cookies 
    res.cookie("refreshToken", refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User loged in successfully",
        data: {
            refreshToken, accessToken, needPasswordChange
        }
    })
})


const changePassword = catchAsync(async (req, res) => {
    
    const {...passwordData} = req.body

    const result = await AuthServices.changePasswordService(req?.user, passwordData)



    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password has been updated successfully",
        data: result
    })
})



export const AuthControllers = {
    loginUser,
    changePassword
}