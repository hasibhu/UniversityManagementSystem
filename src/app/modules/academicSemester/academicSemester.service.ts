import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";
import { academisSemesterAndCodeMapper } from "./academicSemesterConstant";


const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    
    //semester name and semseter code check   
    if (academisSemesterAndCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid academic code.')
    }
    
    
    const result = await AcademicSemesterModel.create(payload)
    
    return result;
}


export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}