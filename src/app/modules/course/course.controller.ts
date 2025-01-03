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
        message: "Course has been retrieved successfully!!",
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
})




const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params; // Match the route parameter
    // console.log("Course ID:", id);

    const result = await courseServices.updateCourseIntoDB(id, req.body);

    // console.log("Update result:", result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course has been updated successfully",
        data: result,
    });
});



// delete a Course 
const deleteCourse = catchAsync(async (req, res) => {
    
    const { id } = req.params;
    // console.log(id);
    const result = await courseServices.deleteCourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course has been deleted successfully",
        data: result
    })
}

)



const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    
    const { courseId } = req.params;

    const { faculties } = req.body;


    const result = await courseServices.assignFacultiesWithCourseIntoDB(courseId, faculties)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty has been assigned successfully",
        data: result
    })
})


const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    
    const { courseId } = req.params;

    const { faculties } = req.body;


    const result = await courseServices.removeFacultiesFromCourseIntoDB(courseId, faculties)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty has been removed successfully",
        data: result
    })
})



export const courseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse

}