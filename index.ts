import express, {Express, Request, Response} from 'express';
import * as database from "./config/database";
import indexRouterClinet from './routes/index.route';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


dotenv.config();
database.connect();
const app: Express =  express();
const port:number | string = process.env.PORT || 3000;


app.use(express.static("public"))
app.set("views", "./views");
app.set("view engine", "pug");
app.use(bodyParser.urlencoded())
app.use(cookieParser());

//Router
indexRouterClinet(app);
//end Router

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});