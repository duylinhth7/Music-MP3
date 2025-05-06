import {Request, Response, NextFunction } from "express";

export const createTopic = (req:Request, res:Response, next:NextFunction) => {
    if(!req.body.title){
        return;
    };
    if(!req.body.status){
        return;
    };
    next();
}

export const editTopic = (req:Request, res:Response, next:NextFunction) => {
    if(!req.body.title){
        return;
    };
    if(!req.body.status){
        return;
    };
    next();
}