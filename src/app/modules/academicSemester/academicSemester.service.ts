import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";


const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    
    //semester name and semseter code check 
    type TAcademisSemesterAndCodeMapper = {
        [key: string]: string
    }
    const academisSemesterAndCodeMapper : TAcademisSemesterAndCodeMapper = {
        Autumn: "01",
        Summer: "02",
        Fall: "03"
    }
    
    if (academisSemesterAndCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid academic code.')
    }
    
    
    const result = await AcademicSemesterModel.create(payload)
    
    return result;
}


export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}