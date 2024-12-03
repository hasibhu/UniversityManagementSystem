
import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterName, AcademicSemesterNameCode, months } from "./academicSemesterConstant";




const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            required: true,
            enum: AcademicSemesterName
        },

        year: {
            type: Date,
            required: true
        },

         
        code: {
            type: String,
            required: true,
            enum: AcademicSemesterNameCode
        },
         
        
        startMonth: {
            type: String,
            enum: months,
            required: true
        },
         
        endMonth: {
            type: String,
            enum: months,
            required: true
        },
         

    },
    
    
)


export const AcademicSemesterModel = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)