import { Request, NextFunction, Response } from "express";
import Accounts from "../../models/admin/account.model";
import { systemConfig } from "../../config/system";
import Role from "../../models/admin/role.model";

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
            const role_id = accountAdmin.role_id;
            const role = await Role.findOne({
                _id: role_id,
                deleted: false
            });
            res.locals.role = role
            next();
        } else{
            res.redirect(PATH + "/auth/login");
        }
    } else {
        res.redirect(PATH + "/auth/login")
    }
}