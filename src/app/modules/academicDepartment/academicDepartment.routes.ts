


import { validateRequest } from "../../middleware/validateRequest";
import express from 'express';
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";



const router = express.Router();


// create-academic-faculty 

router.post(
  '/create-academic-department',
  // validateRequest(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentControllers.createAcademicDepartment,
);




// get all faculty 
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);



// get single faculty by id 
router.get('/:departmentId', AcademicDepartmentControllers.getSingleAcademicDepartment);



// update faculty info 
router.patch(
  '/:departmentId',
  validateRequest(
AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);





export const AcademicDepartmentRoutes = router;