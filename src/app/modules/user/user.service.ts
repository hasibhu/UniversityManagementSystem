import mongoose from 'mongoose';
import config from '../../config';
// import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'student';

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
    userData.id = await generateStudentId(admissionSemester )

    // create a user (transaction 1)
    const newUser = await User.create([userData], {session});


    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user!')
    }



    //create a student
    if (Object.keys(newUser).length) {
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id


      // create a studennt transaction 2   
      const newStudent = await Student.create([payload], { session });
      
      if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student!')
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


export const UserServices = {
  createStudentIntoDB,
};



