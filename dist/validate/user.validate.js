"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.otpPassword = exports.forgetPassword = exports.login = exports.register = void 0;
const register = (req, res, next) => {
    if (!req.body.fullName) {
        return;
    }
    if (!req.body.email) {
        return;
    }
    ;
    if (!req.body.password) {
        return;
    }
    ;
    next();
};
exports.register = register;
const login = (req, res, next) => {
    if (!req.body.email) {
        return;
    }
    ;
    if (!req.body.password) {
        return;
    }
    ;
    next();
};
exports.login = login;
const forgetPassword = (req, res, next) => {
    if (!req.body.email) {
        return;
    }
    ;
    next();
};
exports.forgetPassword = forgetPassword;
const otpPassword = (req, res, next) => {
    if (!req.body.email) {
        return;
    }
    ;
    if (!req.body.otp) {
        return;
    }
    ;
    next();
};
exports.otpPassword = otpPassword;
const resetPassword = (req, res, next) => {
    if (!req.body.password) {
        console.log("Nhập mật khẩu mới?");
        return;
    }
    if (!req.body.confimPassword) {
        console.log("Xác nhận mật khẩu mới?");
        return;
    }
    ;
    if (req.body.password != req.body.confimPassword) {
        console.log("Mật khẩu khác nhau?");
        return;
    }
    ;
    next();
};
exports.resetPassword = resetPassword;
