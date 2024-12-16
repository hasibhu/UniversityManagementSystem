import { Schema, model,  } from "mongoose";
import { TAssignCourseFaculties, TCourse, TPreRequiteCourse } from "./course.interface";


const preRequiteCoursesSchema = new Schema<TPreRequiteCourse>({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
        
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { _id: false }
)

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
    preRequisiteCourses: [preRequiteCoursesSchema],
    isDeleted: {
        type: Boolean,
        default: false
    }

});

const assignCourseFaculties = new Schema<TAssignCourseFaculties>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        unique: true
    },
    faculties: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
        }
    ]
})


export const CourseModel = model<TCourse>('Course', courseSchema);

export const AssigneCourseFacultyModel =  model<TAssignCourseFaculties>('CourseFaculty', assignCourseFaculties)