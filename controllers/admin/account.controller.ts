import { Request, Response } from "express";
import Accounts from "../../models/admin/account.model";

//[GET] /accounts/index
export const index = async (req:Request, res:Response):Promise<void> => {
    const accounts = await Accounts.find({
        deleted: false
    }).select("-password")
    console.log(accounts)
    res.render("admin/pages/accounts/index", {
        title: "Danh sách tài khoản",
        record: accounts
    })
}