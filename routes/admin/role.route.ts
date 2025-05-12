import { Router } from "express";
import * as controller from "../../controllers/admin/role.controller"
const router:Router = Router();


router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", controller.editPatch)
router.get("/permission", controller.permission)
router.patch("/permission/edit", controller.editPermission)


export const roleRouter: Router = router;   