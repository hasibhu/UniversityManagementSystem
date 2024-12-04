import {z} from "zod"
import { AcademicSemesterName, AcademicSemesterNameCode, months } from "./academicSemesterConstant";

const createAcademicSemesterValidationSchema = z.object({

    body: z.object({
        name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
        year: z.string(),
        code: z.enum([...AcademicSemesterNameCode] as [string, ...string[]]),
        startMonth: z.enum([...months] as [string, ...string[]]),
        endMonth: z.enum([...months] as [string, ...string[]]),
    })

});




export const AcademicSemesterValidations = {
    createAcademicSemesterValidationSchema
}