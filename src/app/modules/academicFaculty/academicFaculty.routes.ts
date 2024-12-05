
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { validateRequest } from "../../middleware/validateRequest";
import express from 'express';
import { AcademicFacultyControllers } from "./academicFaculty.controller";


const router = express.Router();


// create-academic-faculty 

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);




// get all faculty 
router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);



// get single faculty bu id 
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);


// update faculty info 
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);





export const AcademicFacultyRoutes = router;