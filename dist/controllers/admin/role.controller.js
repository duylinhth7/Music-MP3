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
exports.editPermission = exports.permission = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const role_model_1 = __importDefault(require("../../models/admin/role.model"));
const system_1 = require("../../config/system");
const PATH = system_1.systemConfig.prefixAdmin;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.default.find({
        deleted: false,
    });
    res.render("admin/pages/role/index", {
        title: "Nhóm quyền tài khoản",
        record: roles,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/role/create", {
        title: "Tạo nhóm quyền mới",
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const record = req.body;
        const newRole = new role_model_1.default(record);
        yield newRole.save();
        res.redirect(PATH + "/role");
    }
    catch (error) {
        res.send("404 NOT FOND!");
    }
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const role = yield role_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    res.render("admin/pages/role/edit", {
        title: "Chỉnh sửa",
        record: role,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield role_model_1.default.updateOne({
            _id: id,
        }, req.body);
        res.redirect(PATH + "/role");
    }
    catch (error) {
        res.send("404 NOT FOUND");
    }
});
exports.editPatch = editPatch;
const permission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield role_model_1.default.find({
        deleted: false,
    });
    res.render("admin/pages/role/permission", {
        title: "Trang phân quyền admin",
        record: role,
    });
});
exports.permission = permission;
const editPermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let recordPermisson = JSON.parse(req.body.permissions);
        for (const item of recordPermisson) {
            if (item.permissions.length > 0) {
                yield role_model_1.default.updateOne({
                    _id: item.id,
                }, {
                    permissions: item.permissions,
                });
            }
        }
        res.redirect(PATH + "/role/permission");
    }
    catch (error) {
        res.send("404 NOT FOUND!");
    }
});
exports.editPermission = editPermission;
