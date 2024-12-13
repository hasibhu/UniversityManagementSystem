import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model"





const createCourseInDB = async (payload: TCourse) => {
    

    const result = await CourseModel.create(payload)

    return result;
}


const getAllCoursesFromDB = async () => {
    

    const result = await CourseModel.find()
    
    return result;
}


const getSingleCourseFromDB = async (id : string) => {
    

    const result = await CourseModel.findById(id)
    
    return result;
}





const deleteCourseFromDB = async (id : string) => {
    

    const result = await CourseModel.findByIdAndUpdate(id, {isDelete: true}, {new: true})
    
    return result;
}





export const courseServices = {
    createCourseInDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB


}