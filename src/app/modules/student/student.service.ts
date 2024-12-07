import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';



// student create api has been transferred in user service 



const getAllStudentsFromDB = async () => {
  // const result = await Student.find();
  const result = await Student.find().populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty'
    }
  });
  return result;
};


// get single student info 
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.aggregate([{ $match: { id } }]);
  
  const result = await Student.findById(id).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty'
    }
  });

  return result;
};



// delete a studen 
const deleteStudentFromDB = async (id: string) => {



  const session = await mongoose.startSession();

  try {
    session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
    
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Student is not deleted!')
    }

    const deletedUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User is not deleted!')
    }


    await session.abortTransaction()
    await session.endSession()


  return deletedStudent;
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }





  // const result = await Student.updateOne({ id }, { isDeleted: true });
  // return result;
};




export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
