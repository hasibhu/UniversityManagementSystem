import StudentModel from "../student.model";
import { Student } from "./student.interface";


const createStudentIntoDB = async (studenData: Student) => {
    // const result = await StudentModel.create(student)
    const result = await StudentModel.create(studenData)
    return result;
};


const getAllStudentsFromDB = async () => {
    const result = await StudentModel.find(); //will bring all data
    return result;
};


const getSingleStudentFromDB = async (id: string) => {
    const result = await StudentModel.findOne({ id }); //will bring single data
    return result;
};




export const StudentServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB
};