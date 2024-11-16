// import { Student } from './student.interface';
import { Request, Response } from "express";
import { StudentServices } from './student.service';


// create student API 
const createStudent = async (req: Request, res: Response) => {
    try {
        const {student : studenData} = req.body;
        const result = await StudentServices.createStudentIntoDB(studenData);

        // send response
        res.status(200).json({
            success: true,
            message: 'Student has been created successfully.',
            data: result
        })
    } catch (error) {
        console.log(error);
    }
};


// get all student api
const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: 'Students have been retrieved successfully.',
            data: result
        })
    } catch (error) {
        console.log(error);
    }
}


// single student api 

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const {studentId} = req.params; //desctructured
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: 'Single students has been retrieved successfully.',
            data: result
        })        
    } catch (error) {
        console.log(error);
    }
}




export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent
}