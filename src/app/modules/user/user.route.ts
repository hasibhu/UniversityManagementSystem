import { UserControllers } from './user.controller';

import { createStudentValidationSchema } from '../student/student.validation';
import { validateRequest } from '../../middleware/validateRequest';

import express from 'express';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import { authValidationMidddleware } from '../../middleware/auth.validationMiddleware';
import { USER_ROLE } from './user.constants';


const router = express.Router();



router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  authValidationMidddleware(USER_ROLE.admin),
  UserControllers.createStudent
);



router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  authValidationMidddleware(USER_ROLE.admin),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  authValidationMidddleware(USER_ROLE.admin),
  UserControllers.createAdmin,
);    

export const UserRoutes = router;
