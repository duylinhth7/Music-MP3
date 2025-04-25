import { Request, Response } from "express"
import md5 from "md5";
import User from "../../models/user.model";
import * as genarateHelper from "../../helpers/genarate";
import { ppid } from "process";
//[GET] /user/register
export const register = async (req: Request, res: Response) => {
    res.render("client/pages/user/register", {
        title: "Đăng ký tài khoản"
    })
}

//[POST] /user/register
export const registerPost = async(req:Request, res:Response):Promise<void> => {
    try {
        const fullName: string = req.body.fullName;
        const email: string = req.body.email;
        const password: string = md5(req.body.password);
        const exitsEmail = await User.findOne({
            email: email,
        });
        if(exitsEmail){
            console.log("Email đã tồn tại");
            return;
        } else {
            const newUser = new User({
                fullName: fullName,
                email: email,
                password: password,
                token: genarateHelper.genarateToken(30)
            });
            await newUser.save();
            res.cookie("token", newUser.token);
            res.redirect("/")
        }
    } catch (error) {
        res.send("404 NOT FOUND!")
    }
}

//[GET] /user/logout
export const logout = async(req:Request, res:Response):Promise<void> => {
    res.clearCookie("token");
    res.redirect("/user/login")
}

//[GET] /user/login
export const login = async(req:Request, res:Response):Promise<void> => {
    res.render("client/pages/user/login",{
        title: "Trang đăng nhập"
    })
}

//[POST] /user/login
export const loginPost = async(req:Request, res:Response):Promise<void> => {
    const email:string = req.body.email;
    const password:string = md5(req.body.password);
    const checkUser = await User.findOne({
        email: email,
        password: password,
        deleted: false,
        status: "active"
    }).select("-password");
    if(!checkUser){
        console.log("Thông tin không hợp lệ!");
        return;
    } else{
        res.cookie("token", checkUser.token);
        res.redirect("/");
    }
}