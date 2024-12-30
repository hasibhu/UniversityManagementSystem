import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { ImageData, TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { Admin } from '../Admin/admin.model';
import { verifyToken } from '../auth/auth.utils';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
// import StudentModel from '../students/student.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStudentIntoDB = async (file: any, password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'student';
  userData.email = payload.email;

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  // verify that admissionSemester is being correctly fetched 
  if (!admissionSemester) {
  throw new Error('Admission semester not found');
  }


  const session = await mongoose.startSession()
  
  try {
    session.startTransaction()
      //set  generated id
    userData.id = await generateStudentId(admissionSemester);

    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file.path
    // send image to cloudinary 
    const imageData = await sendImageToCloudinary(imageName, path);

    // console.log('image data', imageData);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { secure_url } = imageData as any;

    // create a user (transaction 1)
    const newUser = await User.create([userData], {session});

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user!')
    }

    //create a student
    if (Object.keys(newUser).length) {
      
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
      payload.profileImg = secure_url ; //reference _id


      // create a studennt transaction 2   
      const newStudent = await Student.create([payload], { session });
      
      if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student....!')
    }

      await session.commitTransaction();
      await session.endSession();
      
      return newStudent;

    }
    
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error("Failed to create student.")
  }
};


// create faculty 
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'faculty';
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};





// admin create 
const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); 

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};



// get me 

const getMeFromDB = async (token: string) => {
  
  const decoded = verifyToken(token, config.jwt_access_token as string)

  // const result = await 

  const { userId, role } = decoded;
  console.log(userId, role);

  let result = null;

  if (role === 'student') {
    result = await Student.findOne({id: userId})
  }
  if (role === 'admin') {
    result = await Admin.findOne({id: userId})
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({id: userId})
  }



  return result
}




export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB, 
  createAdminIntoDB,
  getMeFromDB
};





// {
//   "password": "hasib",
//   "student": {
//     "id": "2030-02-005",
//     "user": "675a0660914ff2d04af0ad",
//     "name": {
//       "firstName": "Taylor",
//       "middleName": "m",
//       "lastName": "Chris"
//     },
//     "gender": "female",
//     "dateOfBirth": "2006-03-22",
//     "email": "hasibul@gmail.com",
//     "contactNo": "2345678901",
//     "emergencyContactNo": "8765432109",
//     "bloogGroup": "A-",
//     "presentAddress": "25 Maple Street, Greenfield",
//     "permanentAddress": "25 Maple Street, Greenfield",
//     "guardian": {
//       "fatherName": "William Taylor",
//       "fatherOccupation": "Architect",
//       "fatherContactNo": "5552345678",
//       "motherName": "Susan Taylor",
//       "motherOccupation": "Nurse",
//       "motherContactNo": "5558765432"
//     },
//     "localGuardian": {
//       "name": "Rachel Brown",
//       "occupation": "Lawyer",
//       "contactNo": "5556547890",
//       "address": "12 Cedar Avenue, Greenfield"
//     },
//     "profileImg": "https://example.com/profile-img2.jpg",
//     "admissionSemester": "675a0660914ff2d04af0adf2",
//     "academicDepartment": "6759ed1a52aaad8a9a54b7c9",
//     "isDeleted": false
//   }
// }
