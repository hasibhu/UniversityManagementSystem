import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFileds } from "./course.constants";
import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model"





const createCourseInDB = async (payload: TCourse) => {
    

    const result = await CourseModel.create(payload)

    return result;
}


const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    
    const courseQuery = new QueryBuilder(CourseModel.find().populate('preRequisiteCourses.course'), query).search(CourseSearchableFileds).filter().sort().paginate().fields()

    const result = await courseQuery.modelQuery;
    
    return result;
}


const getSingleCourseFromDB = async (id : string) => {
    

    const result = await CourseModel.findById(id).populate('preRequisiteCourses.course')
    
    return result;
}





const deleteCourseFromDB = async (id : string) => {
    
    const result = await CourseModel.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
   
    return result;
}





export const courseServices = {
    createCourseInDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB


}