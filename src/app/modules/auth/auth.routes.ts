
import express from "express"
import { validateRequest } from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validations";
import { AuthControllers } from "./auth.controllers";


const router = express.Router();


router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser)


export const AuthRoutes = router;