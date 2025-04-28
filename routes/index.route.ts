import { Express } from 'express'
import { topicRouter } from './topic.route';
import { songsRouter } from './song.rote';
import { userRouter } from './user.router';
import authMiddleware from '../middleware/auth.middleware';
import { searchRouter } from './search.route';


const indexRouterClinet = (app: Express) => {
    app.use(authMiddleware)
    app.use("/topics", topicRouter);
    app.use("/songs", songsRouter);
    app.use("/user", userRouter);
    app.use("/search", searchRouter);
}
export default indexRouterClinet;