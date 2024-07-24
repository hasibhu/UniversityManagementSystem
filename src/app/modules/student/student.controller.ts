import { Student } from './student.interface';
import { Request, Response } from "express";
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
    

    try {
        const {student : studenData} = req.body;

        const result = await StudentServices.createStudentIntoDB(studenData);

        res.status(200).json({
            success: true,
            message: 'Student has been created successfully.',
            data: result
        })
    } catch (error) {
        console.log(error);
    }
};

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: 'Students has been retrieved successfully.',
            data: result
        })
        
    } catch (error) {
        console.log(error);
    }
}

export const StudentControllers = {
    createStudent,
    getAllStudents
}