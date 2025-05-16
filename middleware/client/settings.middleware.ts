import { Request, Response, NextFunction } from "express";
import SettingsGeneral from "../../models/admin/setting-general.model";

export const settingsGeneralMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    const settings = await SettingsGeneral.findOne({});
    if(settings){
        res.locals.settings = settings
    }
    next();
}