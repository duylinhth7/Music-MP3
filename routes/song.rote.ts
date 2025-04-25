import { Router } from "express";
import * as controller from "../controllers/client/song.controller";
const router:Router = Router();


router.get("/:slugTopic", controller.listSong);
router.get("/detail/:slugSong", controller.detailSong);
router.patch("/favourite/:type/:idSong", controller.favourite);

export const songsRouter: Router = router;