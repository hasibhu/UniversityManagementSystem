import express from 'express';
import { StudentControllers } from './student.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

// create student route has be transferred in user route file 


router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.patch('/:studentId', validateRequest(updateStudentValidationSchema), StudentControllers.updateStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);


export const StudentRoutes = router;
