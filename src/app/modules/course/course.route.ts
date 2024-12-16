
import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { CourseValidations } from "./course.validation";
import { courseControllers } from "./course.controller";


const router = express.Router();



router.post('/create-course', validateRequest(CourseValidations.createCourseValidationSchema), courseControllers.createCourse);

router.get('/', courseControllers.getAllCourses)

router.get('/:id', courseControllers.getSingleCourse);

router.patch('/:id', validateRequest(CourseValidations.updateCourseValidationSchema), courseControllers.updateCourse);

router.delete('/:id', courseControllers.deleteCourse);



router.put('/:courseId/assign-faculties', validateRequest(CourseValidations.assignFacultiesIntoCourseValidationSchema), courseControllers.assignFacultiesWithCourse)

router.delete('/:courseId/remove-faculties', validateRequest(CourseValidations.assignFacultiesIntoCourseValidationSchema), courseControllers.removeFacultiesFromCourse)


export const CourseRoutes = router;

// courseid: 675c1f1163fa9d2b61608b61

// 676021e6d098c7faa138fdd2
// 67602228d098c7faa138fdee