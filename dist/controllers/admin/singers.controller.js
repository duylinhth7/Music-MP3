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
exports.changeMutil = exports.deleteSinger = exports.createPost = exports.create = exports.editPatch = exports.edit = exports.changeStatus = exports.index = void 0;
const singer_model_1 = __importDefault(require("../../models/admin/singer.model"));
const panigation_1 = __importDefault(require("../../helpers/panigation"));
const system_1 = require("../../config/system");
const unidecode_1 = __importDefault(require("../../helpers/unidecode"));
const filterStatus_1 = require("../../helpers/filterStatus");
const PATH = system_1.systemConfig.prefixAdmin;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let find = {
        deleted: false
    };
    const countSingers = yield singer_model_1.default.countDocuments({ deleted: false });
    const objectPanigation = (0, panigation_1.default)({
        currentPage: 1,
        limitItems: 4
    }, req.query, countSingers);
    if (req.query.keyword) {
        const keyword = `${req.query.keyword}`;
        const keywordRegex = new RegExp(keyword, "i");
        const slug = (0, unidecode_1.default)(keyword);
        const stringSlugRegex = new RegExp(slug, "i");
        find["$or"] = [{ fullName: keywordRegex }, { slug: stringSlugRegex }];
    }
    const filterStatusRecord = (0, filterStatus_1.filterStatus)(req.query);
    if (req.query.status) {
        find["status"] = req.query.status;
    }
    const singers = yield singer_model_1.default.find(find).limit(objectPanigation.limitItems).skip(objectPanigation.skipItems);
    res.render("admin/pages/singers/index", {
        title: "Danh sách ca sỹ",
        singers: singers,
        panigation: objectPanigation,
        filterStatus: filterStatusRecord
    });
});
exports.index = index;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSinger = req.params.id;
        const statusChange = req.params.status;
        yield singer_model_1.default.updateOne({
            _id: idSinger
        }, {
            status: statusChange
        });
        res.json({
            code: 200,
            message: "Thay đổi trạng thái thành công!"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Thay đổi trạng không thái thành công!"
        });
    }
});
exports.changeStatus = changeStatus;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSinger = req.params.id;
    const singer = yield singer_model_1.default.findOne({
        _id: idSinger
    });
    res.render("admin/pages/singers/edit", {
        title: "Chỉnh sửa thông tin ca sĩ",
        singer: singer
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSinger = req.params.id;
        yield singer_model_1.default.updateOne({
            _id: idSinger
        }, req.body);
        res.redirect(PATH + "/singers");
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.editPatch = editPatch;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/singers/create", {
        title: "Thêm mới ca sĩ"
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let position;
        let avatar = "";
        if (req.body.position) {
            position = parseInt(req.body.position);
        }
        else {
            position = (yield singer_model_1.default.countDocuments({})) + 1;
        }
        ;
        if (req.body.avatar) {
            avatar = req.body.avatar;
        }
        const record = {
            fullName: req.body.fullName,
            featured: req.body.featured,
            description: req.body.description,
            position: position,
            status: req.body.status,
            avatar: avatar
        };
        const newSinger = new singer_model_1.default(record);
        yield newSinger.save();
        res.redirect(PATH + "/singers");
    }
    catch (error) {
        res.redirect("back");
    }
});
exports.createPost = createPost;
const deleteSinger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield singer_model_1.default.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedAt: new Date
        });
        res.json({
            code: 200,
            message: "Xóa thành công!"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        });
    }
});
exports.deleteSinger = deleteSinger;
const changeMutil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idsArray = req.body.ids.split(",");
    const typeEdit = req.body.type;
    switch (typeEdit) {
        case "delete":
            yield singer_model_1.default.updateMany({
                _id: { $in: idsArray },
            }, {
                deleted: true,
                deletedAt: Date.now(),
            });
            res.redirect(PATH + "/singer");
            break;
        case "active":
            yield singer_model_1.default.updateMany({
                _id: { $in: idsArray },
            }, {
                status: "active",
            });
            res.redirect(PATH + "/singer");
            break;
        case "inactive":
            yield singer_model_1.default.updateMany({
                _id: { $in: idsArray },
            }, {
                status: "inactive",
            });
            res.redirect(PATH + "/singer");
            break;
    }
});
exports.changeMutil = changeMutil;
