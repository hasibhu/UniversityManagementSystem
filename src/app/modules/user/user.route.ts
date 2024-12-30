import { UserControllers } from './user.controller';

import { createStudentValidationSchema } from '../student/student.validation';
import { validateRequest } from '../../middleware/validateRequest';

import express, { NextFunction, Request, Response } from 'express';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import { authValidationMidddleware } from '../../middleware/auth';
import { USER_ROLE } from './user.constants';
import { upload } from '../../utils/sendImageToCloudinary';


const router = express.Router();



router.post(
  '/create-student',
  authValidationMidddleware(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(createStudentValidationSchema),
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
  // authValidationMidddleware(USER_ROLE.admin),
  UserControllers.createAdmin,
);    



router.get(
  '/getMe',
  authValidationMidddleware('student', 'faculty', 'admin'),
  UserControllers.getMe,
);    

export const UserRoutes = router;
