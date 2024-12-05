import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";



const academicDepartmentSchema = new Schema<TAcademicDepartment>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        academicFaulty: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: "AcademiFaculty"
        },
    },
    {
        timestamps: true,
    }
)


export const AcademicDepartmentModel = model<TAcademicDepartment>("AcademicDepartment",academicDepartmentSchema )