"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const roleSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    deleted: {
        type: Boolean,
        default: false
    },
    permissions: {
        type: Array,
        default: []
    },
    deletedAt: Date,
}, { timestamps: true });
const Role = mongoose_1.default.model("Role", roleSchema, "role");
exports.default = Role;
