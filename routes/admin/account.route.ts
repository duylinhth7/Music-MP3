import { Router } from "express";
import * as controller from "../../controllers/admin/account.controller"
import { uploadSingle } from "../../middleware/admin/uploadCloud.middware";
import multer from "multer";
const router:Router = Router();

const upload = multer();


router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("avatar"),
  uploadSingle,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadSingle,
  controller.editPatch
);


export const accountsRouter: Router = router;