import { Request, Response, NextFunction } from "express"
import User from "../../models/client/user.model";
const authMiddleware = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const token:string = req.cookies.token;
    if(token){
        const user = await User.findOne({
            token: token,
            deleted: false,
            status: "active"
        }).select("-password");
        res.locals.user =  user;
    };
    next();
}
export default authMiddleware;