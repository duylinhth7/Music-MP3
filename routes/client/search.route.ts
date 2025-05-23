import { Router } from "express";
import * as controller from "../../controllers/client/search.controller";
const router:Router = Router();


router.get("/:typeSearch", controller.search);

export const searchRouter: Router = router;