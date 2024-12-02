import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// create student route has be transferred in user route file 

router.get('/:studentId', StudentControllers.getSingleStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;
