import { Router } from "express";
import * as controller from "../controllers/client/user.controller";
import * as userValidate from "../validate/user.validate";
const router:Router = Router();


router.get("/register", controller.register);
router.post("/register", userValidate.register, controller.registerPost);
router.get("/logout", controller.logout);
router.get("/login", controller.login);
router.post("/login", userValidate.login, controller.loginPost);

export const userRouter: Router = router;