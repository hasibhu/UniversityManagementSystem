import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsysnc";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AcademicSemesterServices } from "./academicSemester.service";




const createAcademicSemester = catchAsync( async (req: Request, res: Response) => {
    


 const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)



    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semester has been created successfully !!.',
        data: result, 
    })

    
}
)


export const academicSemesterControllers = {
    createAcademicSemester
}