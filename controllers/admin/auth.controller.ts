import { Request, Response } from "express"
import { systemConfig } from "../../config/system"
import md5 from "md5";
import Accounts from "../../models/admin/account.model";

const PATH = systemConfig.prefixAdmin;
// [GET] /auth/login
export const login = async (req:Request, res:Response):Promise<void> => {
    res.render("admin/pages/auth/login")
}

//[POST] /auth/login
export const loginPost = async (req:Request, res:Response):Promise<void> => {
    const email:string = req.body.email;
    const password:string = md5(req.body.password);
    const checkAccount = await Accounts.findOne({
        email: email
    });
    if(!checkAccount){
        console.log("Sai email");
        return;
    };
    if(checkAccount.deleted === true){
        console.log("Tài khoản đã bị xóa")
        return;
    };
    if(checkAccount.status != "active"){
        console.log("Tài khoản đã bị khóa");
        return;
    };
    if(checkAccount.password != password){
        console.log("Sai mật khẩu");
        return;
    };
    res.cookie("tokenAdmin", checkAccount.token);
    res.redirect(PATH + "/dashboard")
}

//[GET] /auth/logout
export const logout = async (req:Request, res:Response):Promise<void> => {
    res.clearCookie("tokenAdmin");
    res.redirect(PATH + "/auth/login") 
}