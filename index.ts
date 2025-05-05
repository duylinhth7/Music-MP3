import express, {Express, Request, Response} from 'express';
import * as database from "./config/database";
import indexRouterClient from './routes/client/index.route';
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import indexRouterAdmin from './routes/admin/index.route';
import { systemConfig } from './config/system';
import mothodOverride from "method-override";

dotenv.config();
database.connect();
const app: Express =  express();
const port:number | string = process.env.PORT || 3000;


app.use(express.static("public"))
app.use(mothodOverride("_method"))
app.set("views", "./views");
app.set("view engine", "pug");
app.use(bodyParser.urlencoded())
app.use(cookieParser());
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.locals.prefixAdmin = systemConfig.prefixAdmin

//Router
indexRouterClient(app);
indexRouterAdmin(app);
//end Router

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});