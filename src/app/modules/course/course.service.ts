import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import catchAsync from "../../utils/catchAsysnc";
import { CourseSearchableFileds } from "./course.constants";
import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model"
import httpStatus from "http-status";
import AppError from "../../errors/AppError";





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



const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {

  
    
    const { preRequisiteCourses, ...courseRamainingData } = payload;

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        // basic info update 
        const updateBasicInfo = await CourseModel.findByIdAndUpdate(
            id,
            courseRamainingData,
            {
                new: true,
                runValidators: true,
                session
            },
            
        );

         if (!updateBasicInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
    }


    // remove single or multiple preRequisiteCourses course

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
        
        const deletedPreRequisites = preRequisiteCourses.filter(el => el.course && el.isDeleted).map(el => el.course)

        console.log(deletedPreRequisites);

        const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
              
            
            id,
            {
                $pull: {preRequisiteCourses : {course : {$in : deletedPreRequisites }}}
            },
            {
                new: true,
                runValidators: true,
                session,
            },
        )

         if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
      }


         // add preRequisiteCourses 

        const addNewPreRequisites = preRequisiteCourses?.filter(el => el.course && !el.isDeleted)


        const newPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
            
            id,
            {
                $addToSet: {preRequisiteCourses : {$each : addNewPreRequisites}}
            },
            {
                new: true,
                runValidators: true,
                session,
            },
        )


        if (!newPreRequisiteCourses) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
        }

    }

        
    
    await session.commitTransaction();
    await session.endSession();

    const result  =  await CourseModel.findById(id).populate('preRequisiteCourses.course')
   
    return result;
        
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

}



const deleteCourseFromDB = async (id : string) => {
    
    const result = await CourseModel.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
   
    return result;
}





export const courseServices = {
    createCourseInDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB


}