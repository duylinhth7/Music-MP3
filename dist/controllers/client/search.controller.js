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
exports.search = void 0;
const unidecode_1 = __importDefault(require("../../helpers/unidecode"));
const song_model_1 = __importDefault(require("../../models/admin/song.model"));
const singer_model_1 = __importDefault(require("../../models/admin/singer.model"));
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newSongs = [];
    const typeSearch = req.params.typeSearch;
    const keyword = `${req.query.keyword}`;
    if (keyword) {
        let keywordRegex = new RegExp(keyword, "i");
        const slug = (0, unidecode_1.default)(keyword);
        const stringSlugRegex = new RegExp(slug, "i");
        const songs = yield song_model_1.default.find({
            $or: [
                { title: keywordRegex },
                { slug: stringSlugRegex }
            ]
        });
        if (songs) {
            for (const item of songs) {
                const singer = (yield singer_model_1.default.findOne({ _id: item.singerId }));
                newSongs.push({
                    id: item.id,
                    avatar: item.avatar,
                    like: item.like,
                    slug: item.slug,
                    title: item.title,
                    updateAt: item.updatedAt,
                    infoSinger: singer
                });
            }
            ;
        }
        ;
        switch (typeSearch) {
            case "detail":
                res.render("client/pages/search/index", {
                    title: "Kết quả tìm kiếm",
                    songs: newSongs,
                    keyword: keyword
                });
                break;
            case "suggest":
                if (newSongs.length > 0) {
                    res.json({
                        code: 200,
                        message: "Tìm kiếm thành công!",
                        songs: newSongs
                    });
                }
                else {
                    res.json({
                        code: 400,
                        message: "Không tìm thấy kết quả!"
                    });
                }
        }
    }
});
exports.search = search;
