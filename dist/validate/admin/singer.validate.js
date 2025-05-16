"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSinger = void 0;
const createSinger = (req, res, next) => {
    if (!req.body.fullName) {
        return;
    }
    ;
    if (!req.body.status) {
        return;
    }
    if (!req.body.featured) {
        return;
    }
    ;
    if (!req.body.description) {
        return;
    }
    ;
    next();
};
exports.createSinger = createSinger;
