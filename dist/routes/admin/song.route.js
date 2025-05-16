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
exports.songsRouter = void 0;
const express_1 = require("express");
const controller = __importStar(require("../../controllers/admin/song.controller"));
const multer_1 = __importDefault(require("multer"));
const uploadCloud_middware_1 = require("../../middleware/admin/uploadCloud.middware");
const songValidate = __importStar(require("../../validate/admin/song.validate"));
const checkPermissions_middleware_1 = require("../../middleware/admin/checkPermissions.middleware");
const upload = (0, multer_1.default)();
const router = (0, express_1.Router)();
router.get("/", (0, checkPermissions_middleware_1.checkPermission)("song_view"), controller.index);
router.get("/create", (0, checkPermissions_middleware_1.checkPermission)("song_create"), controller.create);
router.post("/create", upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
]), uploadCloud_middware_1.uploadFields, songValidate.createSong, controller.createPost);
router.get("/edit/:id", (0, checkPermissions_middleware_1.checkPermission)("song_edit"), controller.edit);
router.patch("/edit/:id", upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
]), uploadCloud_middware_1.uploadFields, songValidate.editSong, controller.editPatch);
router.delete("/delete/:id", (0, checkPermissions_middleware_1.checkPermission)("song_delete"), controller.deleteSong);
router.patch("/changeStatus/:id/:status", (0, checkPermissions_middleware_1.checkPermission)("song_edit"), controller.changeStatus);
router.patch("/change-mutil", (0, checkPermissions_middleware_1.checkPermission)("song_edit"), controller.changeMutil);
exports.songsRouter = router;
