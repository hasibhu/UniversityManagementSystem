





import { Types } from 'mongoose';
import { z } from 'zod';

// const createAcademicDepartmentValidationSchema = z.object({
//   body: z.object({
//     name: z.string({ invalid_type_error: 'Academic faculty must be string'}),
//     academicFaculty: z.string({ invalid_type_error: 'Academic faculty must be string',})
//   }),
// });

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Department name is required',
            invalid_type_error: 'Department name must be a string',
        }),
        academicFaculty: z.string({
            required_error: 'Academic faculty is required',
            invalid_type_error: 'Academic faculty must be a string',
        }).refine((val) => Types.ObjectId.isValid(val), {
            message: 'Invalid academic faculty ID',
        }),
    }),
});




const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({invalid_type_error: 'Academic faculty must be string'}).optional(),
      
    academicFaculty: z.string({ invalid_type_error: 'Academic faculty must be string'}).optional()
  }),
});




export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};