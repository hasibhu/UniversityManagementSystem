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


const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum([...AcademicSemesterNameCode] as [string, ...string[]]).optional(),  //
    startMonth: z.enum([...months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...months] as [string, ...string[]]).optional(),
  }),
});

export const AcademicSemesterValidations = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema
}