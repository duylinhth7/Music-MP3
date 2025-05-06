import { Router } from "express";
import * as controller from "../../controllers/admin/singers.controller";
import multer from "multer";
import { uploadSingle } from "../../middleware/admin/uploadCloud.middware";
import * as singerValidate from "../../validate/admin/singer.validate";

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
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("avatar"),
  uploadSingle,
  singerValidate.createSinger,
  controller.createPost
);
router.delete("/delete/:id", controller.deleteSinger);

export const singersRouter: Router = router;
