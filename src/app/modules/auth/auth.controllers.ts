import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsysnc";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";




const loginUser = catchAsync(async (req, res) => {
    

    const result = await AuthServices.loginUserService(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User loged in successfully",
        data: result
    })
})



export const AuthControllers = {
    loginUser
}