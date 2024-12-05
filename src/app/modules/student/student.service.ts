import { Student } from './student.model';



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
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};




export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
