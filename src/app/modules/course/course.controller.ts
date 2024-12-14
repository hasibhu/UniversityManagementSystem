import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsysnc";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";



// create course 
const createCourse = catchAsync(async (req, res) => {

    const result = await courseServices.createCourseInDB(req.body)
  
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course has been created.",
        data: result
    })

});


// get all courses 
const getAllCourses = catchAsync(async (req, res) => {
     const result = await courseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course has been retrieved successfully",
        data: result
    })
})


// get a single course 
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


// delete a Course 
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