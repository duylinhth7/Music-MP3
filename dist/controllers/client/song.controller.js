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
exports.view = exports.like = exports.favourite = exports.detailSong = exports.listSong = void 0;
const topic_model_1 = __importDefault(require("../../models/admin/topic.model"));
const song_model_1 = __importDefault(require("../../models/admin/song.model"));
const singer_model_1 = __importDefault(require("../../models/admin/singer.model"));
const user_model_1 = __importDefault(require("../../models/client/user.model"));
const listSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugTopic = req.params.slugTopic;
    try {
        const topic = yield topic_model_1.default.findOne({
            slug: slugTopic,
            status: "active"
        });
        const songs = yield song_model_1.default.find({
            topicId: topic.id
        }).select("title avatar singerId topicId like slug");
        for (const song of songs) {
            const infoSinger = yield singer_model_1.default.findOne({
                _id: song.singerId
            }).select("fullName");
            song["infoSinger"] = infoSinger.fullName;
        }
        res.render("client/pages/song/listSong", {
            title: topic.title,
            songs: songs
        });
    }
    catch (error) {
    }
    ;
});
exports.listSong = listSong;
const detailSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugSong = req.params.slugSong;
        const song = yield song_model_1.default.findOne({
            slug: slugSong,
            deleted: false,
            status: "active"
        });
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId
        }).select("fullName slug");
        const topic = yield topic_model_1.default.findOne({
            _id: song.topicId
        });
        res.render("client/pages/song/detail", {
            title: song.title,
            song: song,
            singer: singer,
            topic: topic
        });
    }
    catch (error) {
    }
});
exports.detailSong = detailSong;
const favourite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (res.locals.user) {
            const userId = res.locals.user.id;
            const type = req.params.type;
            const idSong = req.params.idSong;
            if (type == "favourite") {
                yield user_model_1.default.updateOne({
                    _id: userId
                }, {
                    $push: { favourite: idSong }
                });
                res.json({
                    code: 200,
                    message: "Thêm thành công!"
                });
            }
            else {
                yield user_model_1.default.updateOne({
                    _id: userId
                }, {
                    $pull: { favourite: idSong }
                });
                res.json({
                    code: 200,
                    message: "Xóa khỏi danh sách yêu thích thành công!"
                });
            }
        }
        else {
            res.json({
                code: 400,
                message: "Vui lòng đăng nhập!"
            });
        }
    }
    catch (error) {
    }
});
exports.favourite = favourite;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.idSong;
        const idUser = req.params.idUser;
        const checkIdUser = yield user_model_1.default.findOne({
            _id: idUser,
            deleted: false,
            status: "active"
        });
        if (checkIdUser) {
            const isLike = yield song_model_1.default.findOne({
                _id: idSong,
                like: idUser
            });
            const songUpdate = yield song_model_1.default.findOneAndUpdate({
                _id: idSong
            }, isLike ? { $pull: { like: idUser } } : { $push: { like: idUser } }, { new: true, select: "like" });
            if (!songUpdate) {
                res.json({
                    code: 404,
                    message: "Không tìm thấy bài hát!"
                });
                return;
            }
            res.json({
                code: 200,
                totalLike: songUpdate.like.length,
                message: "Cập nhật thành công!"
            });
        }
        else {
            res.json({
                code: 400,
                message: "Tài khoản không hợp lệ!"
            });
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        });
    }
});
exports.like = like;
const view = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong
    }).select("view");
    const newView = song.view + 1;
    yield song_model_1.default.updateOne({
        _id: idSong
    }, {
        view: newView
    });
});
exports.view = view;
