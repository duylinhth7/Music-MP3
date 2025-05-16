"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const song_rote_1 = require("./song.rote");
const user_router_1 = require("./user.router");
const search_route_1 = require("./search.route");
const topic_route_1 = require("./topic.route");
const auth_middleware_1 = __importDefault(require("../../middleware/client/auth.middleware"));
const settings_middleware_1 = require("../../middleware/client/settings.middleware");
const home_route_1 = require("./home.route");
const indexRouterClient = (app) => {
    app.use(auth_middleware_1.default);
    app.use(settings_middleware_1.settingsGeneralMiddleware);
    app.use("/topics", topic_route_1.topicRouter);
    app.use("/songs", song_rote_1.songsRouter);
    app.use("/user", user_router_1.userRouter);
    app.use("/search", search_route_1.searchRouter);
    app.use("/", home_route_1.homeRouter);
};
exports.default = indexRouterClient;
