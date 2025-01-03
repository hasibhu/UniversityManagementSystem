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


const refreshToken = catchAsync(async (req, res) => {
    
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken)

   
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "New access token generated in successfully",
        data: result
    })
})




const forgetPassword = catchAsync(async (req, res) => {
    const userId = req.body.id 
    const result = await AuthServices.forgetPassword(userId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reset link is generated successfully",
        data: result
    })
})



const resetPassword = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    
    const result = await AuthServices.resetPassword(req.body, token)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password reset is  successful",
        data: result
    })
})


export const AuthControllers = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
}