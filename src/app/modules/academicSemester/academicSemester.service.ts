import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";
import { academisSemesterNameCodeMapper } from "./academicSemesterConstant";


// create Academic Semester Into DB 

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    
    //semester name and semseter code check   
    if (academisSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid academic code.')
    }
    
    
    const result = await AcademicSemesterModel.create(payload)
    
    return result;
}


// get all semester data
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};


// get single semester data 
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id);
  return result;
};


// update academic semester info 
const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academisSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemesterModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};


export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB


}