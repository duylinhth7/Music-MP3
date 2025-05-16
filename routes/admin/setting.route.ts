import { Router } from "express";
import * as controller from "../../controllers/admin/setting.controller"
import { checkPermission } from "../../middleware/admin/checkPermissions.middleware";
const router:Router = Router();
import multer from "multer";
import { uploadSingle } from "../../middleware/admin/uploadCloud.middware";

const upload = multer();

router.get("/general", controller.general);
router.patch(
  "/general",
  upload.single("logo"),
  uploadSingle,
  controller.generalPatch
);


export const settingRouter: Router = router;   