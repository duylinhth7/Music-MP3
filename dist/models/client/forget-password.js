"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const forgetPasswordSchema = new mongoose_1.default.Schema({
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expires: 300
    }
}, { timestamps: true });
const ForgetPassword = mongoose_1.default.model("ForgetPassword", forgetPasswordSchema, "forget-password");
exports.default = ForgetPassword;
