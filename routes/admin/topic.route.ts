import { Router } from "express";
import * as controller from "../../controllers/admin/topics.controller";
import multer from "multer";
import { uploadFields, uploadSingle } from "../../middleware/admin/uploadCloud.middware";
import * as topicValidate from "../../validate/admin/topic.validate"

const upload = multer();
const router: Router = Router();

router.get("/", controller.index);
router.get("/create", controller.create)
router.post(
  "/create",
  upload.single("avatar"),
  uploadSingle,
  topicValidate.createTopic,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
    "/edit/:id",
    upload.single("avatar"),
    uploadSingle,
    topicValidate.editTopic,
    controller.editPatch
);
router.patch("/changeStatus/:id/:status", controller.changeStatus);
router.delete("/delete/:id", controller.deleteTopic);

export const topicsRouter: Router = router;
