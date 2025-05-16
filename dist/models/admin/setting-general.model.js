"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const settingsGeneralSchema = new mongoose_1.default.Schema({
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    coppyright: String
}, { timestamps: true });
const SettingsGeneral = mongoose_1.default.model("SettingsGeneral", settingsGeneralSchema, "settings-general");
exports.default = SettingsGeneral;
