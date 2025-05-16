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
exports.home = void 0;
const song_model_1 = __importDefault(require("../../models/admin/song.model"));
const singer_model_1 = __importDefault(require("../../models/admin/singer.model"));
const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songFeatured = yield song_model_1.default.find({
        deleted: false,
        featured: "1"
    });
    const singers = yield singer_model_1.default.find({
        status: "active"
    });
    for (const song of songFeatured) {
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId
        }).select("fullName");
        song["singer"] = singer.fullName;
    }
    res.render("client/pages/home/index", {
        title: "Trang chủ",
        songFeatured: songFeatured,
        singers: singers
    });
});
exports.home = home;
