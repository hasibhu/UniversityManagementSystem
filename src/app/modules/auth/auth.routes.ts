
import express from "express"
import { validateRequest } from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validations";
import { AuthControllers } from "./auth.controllers";
import { authValidationMidddleware } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";


const router = express.Router();


router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser)



// password change route 
router.post('/change-password',
    authValidationMidddleware(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student ),
    validateRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword)

// password change route 
router.post('/refresh-token',
    // authValidationMidddleware(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student ),
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken)


export const AuthRoutes = router;