import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsysnc';
import AppError from '../../errors/AppError';


// RequestHandler of express will wrok for type declaration of the res, req, and next. 

const createStudent  = catchAsync( async (req, res) => {

 
    const { password, student: studentData } = req.body;

    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student has been created succesfully',
      data: result,
    });
  
});




const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty has been created succesfully',
    data: result,
  });
});



const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin has been created succesfully',
    data: result,
  });
});



const getMe = catchAsync(async (req, res) => {
  const token = req.headers.authorization;


  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, 'Token is not found.' )
  }
  const result = await UserServices.getMeFromDB(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data has been retrieved succesfully',
    data: result,
  });
});


export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe
};

