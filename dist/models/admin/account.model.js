"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const accountsSchema = new mongoose_1.default.Schema({
    fullName: String,
    email: String,
    phone: String,
    password: String,
    avatar: String,
    role_id: String,
    status: String,
    token: String,
    role: {
        type: Object,
        default: null
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, { timestamps: true });
const Accounts = mongoose_1.default.model("Accounts", accountsSchema, "accounts");
exports.default = Accounts;
