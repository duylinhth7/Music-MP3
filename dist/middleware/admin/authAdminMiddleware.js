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
exports.authAdminMiddleware = void 0;
const account_model_1 = __importDefault(require("../../models/admin/account.model"));
const system_1 = require("../../config/system");
const role_model_1 = __importDefault(require("../../models/admin/role.model"));
const authAdminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const PATH = system_1.systemConfig.prefixAdmin;
    const tokenAdmin = req.cookies.tokenAdmin;
    if (tokenAdmin) {
        const accountAdmin = yield account_model_1.default.findOne({
            token: tokenAdmin,
            deleted: false
        }).select("-password");
        if (accountAdmin) {
            res.locals.accountAdmin = accountAdmin;
            const role_id = accountAdmin.role_id;
            const role = yield role_model_1.default.findOne({
                _id: role_id,
                deleted: false
            });
            res.locals.role = role;
            next();
        }
        else {
            res.redirect(PATH + "/auth/login");
        }
    }
    else {
        res.redirect(PATH + "/auth/login");
    }
});
exports.authAdminMiddleware = authAdminMiddleware;
