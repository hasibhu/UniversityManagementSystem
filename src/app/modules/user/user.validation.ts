import { z } from 'zod';

const userValidationSchema = z.object({
  pasword: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
  needsPasswordChange: z.boolean().optional().default(true),
  role: z.enum(['student', 'faculty', 'admin']),
  status: z.enum(['in-progess', 'blocked']).default('in-progess'),
  isDelete: z.boolean().optional().default(false)
});

export const UserValidation = {
  userValidationSchema,
};
