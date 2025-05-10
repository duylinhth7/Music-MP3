import { Request, NextFunction, Response } from "express";
import Accounts from "../../models/admin/account.model";
import { systemConfig } from "../../config/system";

export const authAdminMiddleware =  async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const PATH = systemConfig.prefixAdmin;
    const tokenAdmin = req.cookies.tokenAdmin;
    if(tokenAdmin){
        const accountAdmin = await Accounts.findOne({
            token: tokenAdmin,
            deleted: false
        }).select("-password");
        if(accountAdmin){
            res.locals.accountAdmin = accountAdmin;
            next();
        } else{
            res.redirect(PATH + "/auth/login");
        }
    } else {
        res.redirect(PATH + "/auth/login")
    }
}