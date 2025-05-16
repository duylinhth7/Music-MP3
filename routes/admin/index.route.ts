import { Express } from "express";
import { systemConfig } from "../../config/system";
import { dashboardRouter } from "./dashboard.route";
import { songsRouter } from "./song.route";
import { singersRouter } from "./singer.route";
import { topicsRouter } from "./topic.route";
import { authRouter } from "./auth.route";
import { authAdminMiddleware } from "../../middleware/admin/authAdminMiddleware";
import { accountsRouter } from "./account.route";
import { roleRouter } from "./role.route";
import { settingRouter } from "./setting.route";

const indexRouterAdmin = (app: Express) => {
  const PATH = systemConfig.prefixAdmin;
  app.use(PATH + "/dashboard", authAdminMiddleware, dashboardRouter);
  app.use(PATH + "/songs", authAdminMiddleware, songsRouter);
  app.use(PATH + "/singers", authAdminMiddleware, singersRouter);
  app.use(PATH + "/topics", authAdminMiddleware, topicsRouter);
  app.use(PATH + "/auth", authRouter);
  app.use(PATH + "/accounts", authAdminMiddleware, accountsRouter)
  app.use(PATH + "/role", authAdminMiddleware, roleRouter);
  app.use(PATH + "/settings", authAdminMiddleware, settingRouter)
};
export default indexRouterAdmin;
