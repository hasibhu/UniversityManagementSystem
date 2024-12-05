import { Types } from "mongoose";




export type TAcademicDepartment = {
    name: string;
    academicFaulty: Types.ObjectId;
};