import { Request,Response, NextFunction } from "express";
export const checkPermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = res.locals.role;
    if (role && role.permissions.includes(permission)) {
      next();
    } else {
      res.send("Bạn không được cấp quyền này!");
    }
  };
};
