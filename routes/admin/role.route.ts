import { Router } from "express";
import * as controller from "../../controllers/admin/role.controller"
import { checkPermission } from "../../middleware/admin/checkPermissions.middleware";
const router:Router = Router();


router.get("/", checkPermission("role_view"), controller.index);
router.get("/create", checkPermission("role_create"), controller.create);
router.post("/create", checkPermission("role_create"), controller.createPost);
router.get("/edit/:id", checkPermission("role_edit"), controller.edit);
router.patch("/edit/:id", checkPermission("role_edit"), controller.editPatch)
router.get("/permission", checkPermission("role_edit"), controller.permission)
router.patch("/permission/edit", checkPermission("role_edit"), controller.editPermission)


export const roleRouter: Router = router;   