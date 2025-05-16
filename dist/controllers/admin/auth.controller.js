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
exports.logout = exports.loginPost = exports.login = void 0;
const system_1 = require("../../config/system");
const md5_1 = __importDefault(require("md5"));
const account_model_1 = __importDefault(require("../../models/admin/account.model"));
const PATH = system_1.systemConfig.prefixAdmin;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/auth/login");
});
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = (0, md5_1.default)(req.body.password);
    const checkAccount = yield account_model_1.default.findOne({
        email: email
    });
    if (!checkAccount) {
        console.log("Sai email");
        return;
    }
    ;
    if (checkAccount.deleted === true) {
        console.log("Tài khoản đã bị xóa");
        return;
    }
    ;
    if (checkAccount.status != "active") {
        console.log("Tài khoản đã bị khóa");
        return;
    }
    ;
    if (checkAccount.password != password) {
        console.log("Sai mật khẩu");
        return;
    }
    ;
    res.cookie("tokenAdmin", checkAccount.token);
    res.redirect(PATH + "/dashboard");
});
exports.loginPost = loginPost;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("tokenAdmin");
    res.redirect(PATH + "/auth/login");
});
exports.logout = logout;
