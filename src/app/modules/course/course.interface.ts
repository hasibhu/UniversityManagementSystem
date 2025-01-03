import { Types } from "mongoose";


export type TPreRequiteCourse = {
    course: Types.ObjectId;
    isDeleted: boolean
}


export type TCourse = {
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: [TPreRequiteCourse];
    isDeleted?: string
};


export type TAssignCourseFaculties = {
    course: Types.ObjectId;
    faculties: [Types.ObjectId];
}