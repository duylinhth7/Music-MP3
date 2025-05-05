import { Router } from "express";
import * as controller from "../../controllers/admin/song.controller";
import multer from "multer";
import { uploadFields } from "../../middleware/admin/uploadCloud.middware";
import * as songValidate  from "../../validate/admin/song.validate";

const upload = multer();
const router: Router = Router();

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadFields,
  songValidate.createSong,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadFields,
  songValidate.editSong,
  controller.editPatch
);

router.delete("/delete/:id", controller.deleteSong)

export const songsRouter: Router = router;
