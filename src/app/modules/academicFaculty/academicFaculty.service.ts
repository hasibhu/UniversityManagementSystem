import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFacultyModel } from "./academicFaculty.model";




const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  
   const isDepartmentExist = await AcademicFacultyModel.findOne({
    name: payload.name
  })

  if (isDepartmentExist) {
    throw new Error("The given faculty is already available in the database.")
  }

  const result = await AcademicFacultyModel.create(payload);
  return result;
};


const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};