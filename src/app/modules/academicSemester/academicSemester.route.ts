import express from "express"
import { academicSemesterControllers } from "./academicSemester.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";


const router = express.Router()

// create semster info 
router.post('/create-academic-semester', validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema) ,academicSemesterControllers.createAcademicSemester)


// get all semster info 
router.get('/', academicSemesterControllers.getAllAcademicSemesters);


// get single semester info 
router.get(
  '/:semesterId',
  academicSemesterControllers.getSingleAcademicSemester,
);


// update semester info 
router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
academicSemesterControllers.updateAcademicSemester,
);




export const AcademicSemesterRoutes = router; 



// hometask = get all, id, and patch 