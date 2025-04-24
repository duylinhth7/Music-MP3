import { Router } from "express";
import * as controller from "../controllers/client/song.controller";
const router:Router = Router();


router.get("/:slugTopic", controller.listSong);
router.get("/detail/:slugSong", controller.detailSong)

export const songsRouter: Router = router;