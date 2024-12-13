import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsysnc";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";




const createCourse = catchAsync(async (req, res) => {

    const result = await courseServices.createCourseInDB(req.body)
  
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course has been created.",
        data: result
    })

});

const getAllCourses = catchAsync(async (req, res) => {
     const result = await courseServices.getAllCoursesFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course has been retrieved successfully",
        data: result
    })
})


const getSingleCourse = catchAsync(async (req, res) => {
    
     const { courseId } = req.params;
    const result = await courseServices.getSingleCourseFromDB(courseId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Courses have been retrieved successfully",
        data: result
    })
}

)



const deleteCourse = catchAsync(async (req, res) => {
    
     const { courseId } = req.params;
    const result = await courseServices.deleteCourseFromDB(courseId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course has been deleted successfully",
        data: result
    })
}

)







export const courseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse

}