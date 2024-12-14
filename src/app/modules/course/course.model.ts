import { Schema, model,  } from "mongoose";
import { TCourse, TPreRequiteCourse } from "./course.interface";


const preRequiteCoursesSchema = new Schema<TPreRequiteCourse>({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
        
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    prefix: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: Number,
        trim: true,
        required: true
    },
    credits: {
        type: Number,
        trim: true,
        required: true
    },
    preRequisiteCourses: [preRequiteCoursesSchema]

});


export const CourseModel =  model<TCourse>('Course', courseSchema)