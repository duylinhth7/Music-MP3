import { Router } from "express";
import * as controller from "../../controllers/admin/song.controller";
import multer from "multer";
import { uploadFields } from "../../middleware/admin/uploadCloud.middware";
import * as songValidate from "../../validate/admin/song.validate";
import { checkPermission } from "../../middleware/admin/checkPermissions.middleware";

const upload = multer();
const router: Router = Router();

router.get("/", checkPermission("song_view"), controller.index);
router.get("/create", checkPermission("song_create"), controller.create);
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
router.get("/edit/:id", checkPermission("song_edit"), controller.edit);
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

router.delete(
  "/delete/:id",
  checkPermission("song_delete"),
  controller.deleteSong
);
router.patch(
  "/changeStatus/:id/:status",
  checkPermission("song_edit"),
  controller.changeStatus
);
router.patch(
  "/change-mutil",
  checkPermission("song_edit"),
  controller.changeMutil
);

export const songsRouter: Router = router;
