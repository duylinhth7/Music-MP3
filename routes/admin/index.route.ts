import { Express } from 'express'
import {systemConfig} from "../../config/system";
import { dashboardRouter } from './dashboard.route';
import { songsRouter } from './song.route';
import { singersRouter } from './singer.route';
const indexRouterAdmin = (app: Express) => {
    const PATH = systemConfig.prefixAdmin;
    app.use(PATH + "/dashboard", dashboardRouter)
    app.use(PATH + "/songs", songsRouter)
    app.use(PATH + "/singers", singersRouter)
}
export default indexRouterAdmin;