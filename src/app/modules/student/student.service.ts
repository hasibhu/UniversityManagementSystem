import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constants';



// student create api has been transferred in user service 

// const getAllStudentsFromDB = async () => {
//   // const result = await Student.find();
//   const result = await Student.find().populate('admissionSemester').populate({
//     path: 'academicDepartment',
//     populate: {
//       path: 'academicFaculty'
//     }
//   });
//   return result;
// };



const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  /*
  const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object 
   
  let searchTerm = '';   // SET DEFAULT VALUE 

  // IF searchTerm  IS GIVEN SET IT
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string; 
  }

  
 // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  : 
  { email: { $regex : query.searchTerm , $options: i}}
  { presentAddress: { $regex : query.searchTerm , $options: i}}
  { 'name.firstName': { $regex : query.searchTerm , $options: i}}

  
  // WE ARE DYNAMICALLY DOING IT USING LOOP
   const searchQuery = Student.find({
     $or: studentSearchableFields.map((field) => ({
       [field]: { $regex: searchTerm, $options: 'i' },
    })),
   });

  
   // FILTERING fUNCTIONALITY:
  
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
   excludeFields.forEach((el) => delete queryObj[el]);  // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

 
  // SORTING FUNCTIONALITY:
  
  let sort = '-createdAt'; // SET DEFAULT VALUE 
 
 // IF sort  IS GIVEN SET IT
  
   if (query.sort) {
    sort = query.sort as string;
  }

   const sortQuery = filterQuery.sort(sort);


   // PAGINATION FUNCTIONALITY:

   let page = 1; // SET DEFAULT VALUE FOR PAGE 
   let limit = 1; // SET DEFAULT VALUE FOR LIMIT 
   let skip = 0; // SET DEFAULT VALUE FOR SKIP


  // IF limit IS GIVEN SET IT
  
  if (query.limit) {
    limit = Number(query.limit);
  }

  // IF page IS GIVEN SET IT

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  
  
  // FIELDS LIMITING FUNCTIONALITY:

  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH 

  fields: 'name,email'; // WE ARE ACCEPTING FROM REQUEST
  fields: 'name email'; // HOW IT SHOULD BE 

  let fields = '-__v'; // SET DEFAULT VALUE

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');

  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;

  */

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
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
