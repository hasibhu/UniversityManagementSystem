import httpStatus from 'http-status';

import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';






// RequestHandler of express will wrok fpr type declaration of the res, req, and next. 

const createStudent : RequestHandler = async (req, res, next) => {

  try {
    const { password, student: studentData } = req.body;

    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    next(err); //next will carry the error in the globar error handler  file 
  }
};

export const UserControllers = {
  createStudent,
};

