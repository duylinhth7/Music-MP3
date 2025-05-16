"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const checkPermission = (permission) => {
    return (req, res, next) => {
        const role = res.locals.role;
        if (role && role.permissions.includes(permission)) {
            next();
        }
        else {
            res.send("Bạn không được cấp quyền này!");
        }
    };
};
exports.checkPermission = checkPermission;
