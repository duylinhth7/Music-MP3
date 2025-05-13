import { Router } from "express";
import * as controller from "../../controllers/client/user.controller";
import * as userValidate from "../../validate/user.validate";
const router:Router = Router();


router.get("/register", controller.register);
router.post("/register", userValidate.register, controller.registerPost);
router.get("/logout", controller.logout);
router.get("/login", controller.login);
router.post("/login", userValidate.login, controller.loginPost);
router.get("/password/forget", controller.forget);
router.post("/password/forget", userValidate.forgetPassword, controller.forgetPost);
router.post("/password/otp", userValidate.otpPassword, controller.otpPost)
router.post("/password/reset", userValidate.resetPassword, controller.resetPassword)

export const userRouter: Router = router;