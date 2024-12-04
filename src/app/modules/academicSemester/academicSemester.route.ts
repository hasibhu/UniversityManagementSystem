import express from "express"
import { academicSemesterControllers } from "./academicSemester.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";


const router = express.Router()


router.post('/create-academic-semester', validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema) ,academicSemesterControllers.createAcademicSemester)



export const AcademicSemesterRoutes = router; 