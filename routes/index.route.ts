import { Express } from 'express'
import { topicRouter } from './topic.route';
import { songsRouter } from './song.rote';


const indexRouterClinet = (app: Express) => {
    app.use("/topics", topicRouter);
    app.use("/songs", songsRouter);
}
export default indexRouterClinet;