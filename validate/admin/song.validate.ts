import { Request, Response, NextFunction } from "express";

export const createSong = (req: Request, res:Response, next:NextFunction) => {
    if(!req.body.title){
        res.redirect("back");
        return;
    };
    if(!req.body.topicId){
        res.redirect("back");
        return;
    };
    if(!req.body.singerId){
        res.redirect("back");
        return;
    };
    if(!req.body.featured){
        res.redirect("back");
        return;
    };
    if(!req.body.status){
        res.redirect("back");
        return;
    };
    if(!req.body.avatar){
        res.redirect("back");
        return;
    };
    if(!req.body.audio){
        res.redirect("back");
        return;
    };
    next();
}