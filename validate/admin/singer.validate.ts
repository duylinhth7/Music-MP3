import {Request, Response, NextFunction } from "express";

export const createSinger = (req:Request, res:Response, next:NextFunction) => {
    if(!req.body.fullName){
        return;
    };
    if(!req.body.status){
        return;
    }
    if(!req.body.featured){
        return;
    };
    if(!req.body.description){
        return;
    };
    next();
}