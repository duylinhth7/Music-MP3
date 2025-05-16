"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTopic = exports.createTopic = void 0;
const createTopic = (req, res, next) => {
    if (!req.body.title) {
        return;
    }
    ;
    if (!req.body.status) {
        return;
    }
    ;
    next();
};
exports.createTopic = createTopic;
const editTopic = (req, res, next) => {
    if (!req.body.title) {
        return;
    }
    ;
    if (!req.body.status) {
        return;
    }
    ;
    next();
};
exports.editTopic = editTopic;
