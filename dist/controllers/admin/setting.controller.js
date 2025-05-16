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
exports.generalPatch = exports.general = void 0;
const setting_general_model_1 = __importDefault(require("../../models/admin/setting-general.model"));
const system_1 = require("../../config/system");
const PATCH = system_1.systemConfig.prefixAdmin;
const general = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const settings = yield setting_general_model_1.default.findOne({});
    res.render("admin/pages/settings/general", {
        title: "Trang cài đặt chung",
        settings: settings,
    });
});
exports.general = general;
const generalPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countSettings = yield setting_general_model_1.default.countDocuments({});
        const settingUpdate = yield setting_general_model_1.default.findOne({});
        if (countSettings === 0) {
            const newSetting = new setting_general_model_1.default(req.body);
            newSetting.save();
            res.redirect(PATCH + "/settings/general");
        }
        else {
            yield setting_general_model_1.default.updateOne({
                _id: settingUpdate.id,
            }, req.body);
            res.redirect(PATCH + "/settings/general");
        }
    }
    catch (error) { }
});
exports.generalPatch = generalPatch;
