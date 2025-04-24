import express, {Express, Request, Response} from 'express';
import * as database from "./config/database";
import indexRouterClinet from './routes/index.route';
import dotenv from "dotenv";


dotenv.config();
database.connect();
const app: Express =  express();
const port:number | string = process.env.PORT || 3000;


app.use(express.static("public"))
app.set("views", "./views");
app.set("view engine", "pug");

//Router
indexRouterClinet(app);
//end Router

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});