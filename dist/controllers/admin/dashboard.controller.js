"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const user_model_1 = __importDefault(require("../../models/client/user.model"));
const song_model_1 = __importDefault(require("../../models/admin/song.model"));
const singer_model_1 = __importDefault(require("../../models/admin/singer.model"));
const topic_model_1 = __importDefault(require("../../models/admin/topic.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalUser = yield user_model_1.default.countDocuments({
        deleted: false
    });
    const totalSong = yield song_model_1.default.countDocuments({
        deleted: false,
        status: "active"
    });
    const totalSinger = yield singer_model_1.default.countDocuments({
        deleted: false
    });
    const totalTopic = yield topic_model_1.default.countDocuments({
        deleted: false
    });
    res.render("admin/pages/dashboard/index", {
        title: "Trang tổng quan",
        totalUser: totalUser,
        totalSong: totalSong,
        totalSinger: totalSinger,
        totalTopic: totalTopic
    });
});
exports.index = index;
