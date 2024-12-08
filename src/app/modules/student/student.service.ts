import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';



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
  
  const result = await Student.findOne({id}).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty'
    }
  });

  return result;
};





// update student info 

const updateStudentIntomDB = async (id: string, payload: Partial<TStudent>) => {

  const {name, guardian, localGuardian, ...remainingStudentData} = payload


  const modifiedUpdatedData: Record<string, unknown> = { ...remainingStudentData };

  // for name 
    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`]= value
      }
    }

  // for guardian 
  if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
          modifiedUpdatedData[`guardian.${key}`]= value
        }
      }

  
  // for localGuardian

  if (localGuardian && Object.keys(localGuardian).length) {
          for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`]= value
          }
        }



        console.log(modifiedUpdatedData);


  // const result = await Student.findOneAndUpdate({ id }, payload);
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {new: true, runValidators: true});

  return result;
};










// delete a studen 
const deleteStudentFromDB = async (id: string) => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

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

    throw new Error('Failed to delete student')
  }





  // const result = await Student.updateOne({ id }, { isDeleted: true });
  // return result;
};




export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntomDB,
  deleteStudentFromDB,
};
