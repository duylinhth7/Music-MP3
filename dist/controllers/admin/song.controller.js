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
exports.changeMutil = exports.changeStatus = exports.deleteSong = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/admin/song.model"));
const singer_model_1 = __importDefault(require("../../models/admin/singer.model"));
const topic_model_1 = __importDefault(require("../../models/admin/topic.model"));
const system_1 = require("../../config/system");
const panigation_1 = __importDefault(require("../../helpers/panigation"));
const unidecode_1 = __importDefault(require("../../helpers/unidecode"));
const filterStatus_1 = require("../../helpers/filterStatus");
const PATH = system_1.systemConfig.prefixAdmin;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let find = {
        deleted: false,
    };
    const countSongs = yield song_model_1.default.countDocuments({ deleted: false });
    const objectPanigation = (0, panigation_1.default)({
        currentPage: 1,
        limitItems: 3,
    }, req.query, countSongs);
    if (req.query.keyword) {
        const keyword = `${req.query.keyword}`;
        const keywordRegex = new RegExp(keyword, "i");
        const slug = (0, unidecode_1.default)(keyword);
        const stringSlugRegex = new RegExp(slug, "i");
        find["$or"] = [{ title: keywordRegex }, { slug: stringSlugRegex }];
    }
    const filterStatusRecord = (0, filterStatus_1.filterStatus)(req.query);
    if (req.query.status) {
        find["status"] = req.query.status;
    }
    const songs = yield song_model_1.default.find(find)
        .select("-description -lyrics")
        .limit(objectPanigation.limitItems)
        .skip(objectPanigation.skipItems);
    for (const song of songs) {
        const singer = yield singer_model_1.default.findOne({ _id: song.singerId }).select("fullName");
        song["infoSinger"] = singer;
        const topic = yield topic_model_1.default.findOne({ _id: song.topicId }).select("title");
        song["topic"] = topic;
    }
    res.render("admin/pages/songs/index", {
        title: "Danh sách bài hát",
        songs: songs,
        panigation: objectPanigation,
        filterStatus: filterStatusRecord
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({ status: "active" }).select("title");
    const singers = yield singer_model_1.default.find({}).select("fullName");
    res.render("admin/pages/songs/create", {
        title: "Thêm bài hát",
        topics: topics,
        singers: singers,
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let position = 0;
        if (req.body.position) {
            position = req.body.position;
        }
        else {
            position = yield song_model_1.default.countDocuments({ deleted: false });
        }
        const song = {
            title: req.body.title,
            topicId: req.body.topicId,
            singerId: req.body.singerId,
            featured: req.body.featured,
            description: req.body.description,
            lyrics: req.body.lyrics,
            position: position,
            status: req.body.status,
            avatar: req.body.avatar[0],
            audio: req.body.audio[0],
        };
        const newSong = new song_model_1.default(song);
        yield newSong.save();
        res.redirect(`${PATH}/songs`);
    }
    catch (error) { }
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.id;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false,
    });
    const topics = yield topic_model_1.default.find({});
    const singers = yield singer_model_1.default.find({
        status: "active",
    });
    song["topicName"] = topics.find((item) => item.id == song.topicId);
    song["singerName"] = singers.find((item) => item.id == song.singerId);
    res.render("admin/pages/songs/edit", {
        title: "Chỉnh sửa bài hát",
        song: song,
        topics: topics,
        singers: singers,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataUpdate = req.body;
        const idSong = req.params.id;
        yield song_model_1.default.updateOne({
            _id: idSong,
        }, dataUpdate);
        res.redirect(PATH + "/songs");
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.editPatch = editPatch;
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.id;
        yield song_model_1.default.updateOne({
            _id: idSong,
        }, {
            deleted: true,
            deletedAt: new Date(),
        });
        res.json({
            code: 200,
            message: "Xóa bài hát thành công!",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!",
        });
    }
});
exports.deleteSong = deleteSong;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.id;
        const statusChange = req.params.status;
        yield song_model_1.default.updateOne({
            _id: idSong,
        }, {
            status: statusChange,
        });
        res.json({
            code: 200,
            message: "Thay đổi trạng thái thành công!",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Thay đổi trạng không thái thành công!",
        });
    }
});
exports.changeStatus = changeStatus;
const changeMutil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idsArray = req.body.ids.split(",");
    const typeEdit = req.body.type;
    switch (typeEdit) {
        case "delete":
            yield song_model_1.default.updateMany({
                _id: { $in: idsArray },
            }, {
                deleted: true,
                deletedAt: Date.now(),
            });
            res.redirect(PATH + "/songs");
            break;
        case "active":
            yield song_model_1.default.updateMany({
                _id: { $in: idsArray },
            }, {
                status: "active",
            });
            res.redirect(PATH + "/songs");
            break;
        case "inactive":
            yield song_model_1.default.updateMany({
                _id: { $in: idsArray },
            }, {
                status: "inactive",
            });
            res.redirect(PATH + "/songs");
            break;
    }
});
exports.changeMutil = changeMutil;
