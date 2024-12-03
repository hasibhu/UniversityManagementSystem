
import { Schema, model } from "mongoose";
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemester.interface";


const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const AcademicSemesterName: TAcademicSemesterName[] = ["Autumn", "Summer", "Fall"]
const AcademicSemesterNameCode: TAcademicSemesterCode[] = ["01", "02", "03"]



const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            required: true,
            enum: AcademicSemesterName
        },
         
        code: {
            type: String,
            required: true,
            enum: AcademicSemesterNameCode
        },
         
        year: {
            type: Date,
            required: true
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