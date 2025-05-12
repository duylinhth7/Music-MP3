import { Router } from "express";
import * as controller from "../../controllers/admin/account.controller";
import { uploadSingle } from "../../middleware/admin/uploadCloud.middware";
import multer from "multer";
import { checkPermission } from "../../middleware/admin/checkPermissions.middleware";
const router: Router = Router();

const upload = multer();

router.get("/", checkPermission("accounts_view"), controller.index);
router.get("/create", checkPermission("accounts_create"), controller.create);
router.post(
  "/create",
  checkPermission("accounts_view"),
  upload.single("avatar"),
  uploadSingle,
  controller.createPost
);
router.get("/edit/:id", checkPermission("accounts_edit"), controller.edit);
router.patch(
  "/edit/:id",
  checkPermission("accounts_edit"),
  upload.single("avatar"),
  uploadSingle,
  controller.editPatch
);

export const accountsRouter: Router = router;
