
import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { CourseValidations } from "./course.validation";
import { courseControllers } from "./course.controller";


const router = express.Router();



router.post('/create-course', validateRequest(CourseValidations.createCourseValidationSchema), courseControllers.createCourse);

router.get('/', courseControllers.getAllCourses)

router.get('/:id', courseControllers.getSingleCourse);

router.delete('/:id', courseControllers.deleteCourse);


export const CourseRoutes = router;

