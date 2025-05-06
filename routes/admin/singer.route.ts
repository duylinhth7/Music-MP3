import { Router } from "express";
import * as controller from "../../controllers/admin/singers.controller";
import multer from "multer";
import { uploadSingle } from "../../middleware/admin/uploadCloud.middware";
import * as songValidate from "../../validate/admin/song.validate";

const upload = multer();
const router: Router = Router();

router.get("/", controller.index);
router.patch("/changeStatus/:id/:status", controller.changeStatus);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadSingle,
  controller.editPatch
);

export const singersRouter: Router = router;
