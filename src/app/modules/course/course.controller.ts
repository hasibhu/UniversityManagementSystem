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
    
    const { id } = req.params;
   
    const result = await courseServices.getSingleCourseFromDB(id);

   
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single course been retrieved successfully",
        data: result
    })
}

)


// delete a Course 
const deleteCourse = catchAsync(async (req, res) => {
    
    const { id } = req.params;
    console.log(id);
    const result = await courseServices.deleteCourseFromDB(id);

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