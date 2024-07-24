import StudentModel from "../student.model";
import { Student } from "./student.interface";


const createStudentIntoDB = async (student: Student) => {
    const result = await StudentModel.create(student)
    return result;
};

const getAllStudentsFromDB = async () => {
    const result = await StudentModel.find(); //will bring all data
    return result;
}

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentsFromDB
}