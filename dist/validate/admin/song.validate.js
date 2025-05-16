"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editSong = exports.createSong = void 0;
const createSong = (req, res, next) => {
    if (!req.body.title) {
        res.redirect("back");
        return;
    }
    ;
    if (!req.body.topicId) {
        res.redirect("back");
        return;
    }
    ;
    if (!req.body.singerId) {
        res.redirect("back");
        return;
    }
    ;
    if (!req.body.featured) {
        res.redirect("back");
        return;
    }
    ;
    if (!req.body.status) {
        res.redirect("back");
        return;
    }
    ;
    if (!req.body.avatar) {
        res.redirect("back");
        return;
    }
    ;
    if (!req.body.audio) {
        res.redirect("back");
        return;
    }
    ;
    next();
};
exports.createSong = createSong;
const editSong = (req, res, next) => {
    if (!req.body.title) {
        res.redirect("back");
        return;
    }
    ;
    if (!req.body.topicId) {
        res.redirect("back");
        return;
    }
    ;
    if (!req.body.singerId) {
        res.redirect("back");
        return;
    }
    ;
    if (!req.body.status) {
        res.redirect("back");
        return;
    }
    ;
    next();
};
exports.editSong = editSong;
