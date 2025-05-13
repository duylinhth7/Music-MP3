import { NextFunction, Request, Response } from "express";

//register
export const register = (req:Request, res:Response, next:NextFunction) => {
    if (!req.body.fullName) {
        return;
    }
    if (!req.body.email) {
        return;
    };
    if (!req.body.password) {
        return;
    };
    next();
}
//end register

//login
export const login = (req:Request, res:Response, next:NextFunction) => {
    if (!req.body.email) {
        return;
    };
    if (!req.body.password) {
        return;
    };
    next();
}
//end login

//forgetPassword
export const forgetPassword = (req:Request, res:Response, next:NextFunction) => {
    if (!req.body.email) {
        return;
    };
    next();
}
//end forgetPassword

//otp password
export const otpPassword = (req:Request, res:Response, next:NextFunction) => {
    if (!req.body.email) {
        return;
    };
    if (!req.body.otp) {
        return;
    };
    next();
}
//end otp password

//reset password
export const resetPassword = (req:Request, res:Response, next:NextFunction) => {
    if(!req.body.password){
        console.log("Nhập mật khẩu mới?")
        return;
    }
    if(!req.body.confimPassword){
        console.log("Xác nhận mật khẩu mới?")
        return;
    };
    if(req.body.password != req.body.confimPassword){
        console.log("Mật khẩu khác nhau?")
        return;
    };
    next();
}
//end reset password
