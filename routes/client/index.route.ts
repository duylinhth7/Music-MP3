import { Express } from 'express'
import { songsRouter } from './song.rote';
import { userRouter } from './user.router';
import { searchRouter } from './search.route';
import { topicRouter } from './topic.route';
import authMiddleware from '../../middleware/client/auth.middleware';
import { settingsGeneralMiddleware } from '../../middleware/client/settings.middleware';
import { homeRouter } from './home.route';


const indexRouterClient = (app: Express) => {
    app.use(authMiddleware);
    app.use(settingsGeneralMiddleware)
    app.use("/topics", topicRouter);
    app.use("/songs", songsRouter);
    app.use("/user", userRouter);
    app.use("/search", searchRouter);
    app.use("/", homeRouter)
}
export default indexRouterClient;