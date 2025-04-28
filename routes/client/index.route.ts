import { Express } from 'express'
import authMiddleware from '../../middleware/auth.middleware';
import { songsRouter } from './song.rote';
import { userRouter } from './user.router';
import { searchRouter } from './search.route';
import { topicRouter } from './topic.route';


const indexRouterClient = (app: Express) => {
    app.use(authMiddleware)
    app.use("/topics", topicRouter);
    app.use("/songs", songsRouter);
    app.use("/user", userRouter);
    app.use("/search", searchRouter);
}
export default indexRouterClient;