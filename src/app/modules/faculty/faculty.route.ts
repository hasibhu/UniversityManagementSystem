


import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { createFacultyValidationSchema, updateFacultyValidationSchema } from './faculty.validation';
import { UserControllers } from '../user/user.controller';
import { authValidationMidddleware } from '../../middleware/auth';


const router = express.Router();


router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);


router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', authValidationMidddleware(), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;