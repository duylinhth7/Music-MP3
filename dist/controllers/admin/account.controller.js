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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const account_model_1 = __importDefault(require("../../models/admin/account.model"));
const role_model_1 = __importDefault(require("../../models/admin/role.model"));
const md5_1 = __importDefault(require("md5"));
const system_1 = require("../../config/system");
const PATH = system_1.systemConfig.prefixAdmin;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield account_model_1.default.find({
        deleted: false,
    }).select("-password");
    res.render("admin/pages/accounts/index", {
        title: "Danh sách tài khoản",
        record: accounts,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.default.find({
        deleted: false,
    });
    res.render("admin/pages/accounts/create", {
        title: "Thêm tài khoản admin",
        roles: roles,
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.password = (0, md5_1.default)(req.body.password);
        const email = req.body.email;
        const exitsEmail = yield account_model_1.default.findOne({
            email: email,
        });
        if (exitsEmail) {
            console.log("Email này đã tồn tại");
            res.redirect(PATH + "/accounts/");
        }
        else {
            const newAccount = new account_model_1.default(req.body);
            yield newAccount.save();
            res.redirect(PATH + "/accounts/");
        }
    }
    catch (error) {
        res.send("404 NOT FOUND!");
    }
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const account = yield account_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    const roles = yield role_model_1.default.find({ deleted: false });
    res.render("admin/pages/accounts/edit", {
        title: "Chỉnh sửa tài khoản admin",
        account: account,
        roles: roles,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const id = req.params.id;
    req.body.password = (0, md5_1.default)(req.body.password);
    const exitsEmail = yield account_model_1.default.findOne({
        _id: { $ne: id },
        email: email,
    });
    if (exitsEmail) {
        console.log("Email này đã tồn tại");
        return;
    }
    else {
        yield account_model_1.default.updateOne({
            _id: id
        }, req.body);
    }
    ;
    res.redirect(PATH + "/accounts/");
});
exports.editPatch = editPatch;
