import { Router } from "express";
import * as controller from "../../controllers/admin/singers.controller";
import multer from "multer";
import { uploadSingle } from "../../middleware/admin/uploadCloud.middware";
import * as singerValidate from "../../validate/admin/singer.validate";
import { checkPermission } from "../../middleware/admin/checkPermissions.middleware";

const upload = multer();
const router: Router = Router();

router.get("/", checkPermission("singer_view"), controller.index);
router.patch(
  "/changeStatus/:id/:status",
  checkPermission("singer_edit"),
  controller.changeStatus
);
router.get("/edit/:id", checkPermission("singer_edit"), controller.edit);
router.patch(
  "/edit/:id",
  checkPermission("singer_edit"),
  upload.single("avatar"),
  uploadSingle,
  controller.editPatch
);
router.get("/create", checkPermission("singer_create"), controller.create);
router.post(
  "/create",
  checkPermission("singer_create"),
  upload.single("avatar"),
  uploadSingle,
  singerValidate.createSinger,
  controller.createPost
);
router.delete(
  "/delete/:id",
  checkPermission("singer_delete"),
  controller.deleteSinger
);
router.patch(
  "/change-mutil",
  checkPermission("singer_edit"),
  controller.changeMutil
);

export const singersRouter: Router = router;
