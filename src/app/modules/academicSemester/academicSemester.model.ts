
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
            type: String,
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
    
    {
    timestamps: true,
    },
    
    
)



academicSemesterSchema.pre("save", async function (next) {
    const isSemesterExists = await AcademicSemesterModel.findOne({
        year: this.year,
        name: this.name
    });

    if (isSemesterExists) {
        throw new Error('Semester already exists!!!!.')
    }

    next()
})



export const AcademicSemesterModel = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)