"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountsRouter = void 0;
const express_1 = require("express");
const controller = __importStar(require("../../controllers/admin/account.controller"));
const uploadCloud_middware_1 = require("../../middleware/admin/uploadCloud.middware");
const multer_1 = __importDefault(require("multer"));
const checkPermissions_middleware_1 = require("../../middleware/admin/checkPermissions.middleware");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
router.get("/", (0, checkPermissions_middleware_1.checkPermission)("accounts_view"), controller.index);
router.get("/create", (0, checkPermissions_middleware_1.checkPermission)("accounts_create"), controller.create);
router.post("/create", (0, checkPermissions_middleware_1.checkPermission)("accounts_view"), upload.single("avatar"), uploadCloud_middware_1.uploadSingle, controller.createPost);
router.get("/edit/:id", (0, checkPermissions_middleware_1.checkPermission)("accounts_edit"), controller.edit);
router.patch("/edit/:id", (0, checkPermissions_middleware_1.checkPermission)("accounts_edit"), upload.single("avatar"), uploadCloud_middware_1.uploadSingle, controller.editPatch);
exports.accountsRouter = router;
