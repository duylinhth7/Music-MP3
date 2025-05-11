import { Request, Response } from "express";
import Role from "../../models/admin/role.model";
import { systemConfig } from "../../config/system";

const PATH = systemConfig.prefixAdmin;

//[GET] /role/
export const index = async (req: Request, res: Response): Promise<void> => {
  const roles = await Role.find({
    deleted: false,
  });
  res.render("admin/pages/role/index", {
    title: "Nhóm quyền tài khoản",
    record: roles,
  });
};

//[GET] /role/create
export const create = async (req: Request, res: Response): Promise<void> => {
  res.render("admin/pages/role/create", {
    title: "Tạo nhóm quyền mới",
  });
};

//[POST] /role/create
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const record = req.body;
    const newRole = new Role(record);
    await newRole.save();
    res.redirect(PATH + "/role");
  } catch (error) {
    res.send("404 NOT FOND!");
  }
};

//[GET] /role/edit:/id
export const edit = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;
  const role = await Role.findOne({
    _id: id,
    deleted: false,
  });
  res.render("admin/pages/role/edit", {
    title: "Chỉnh sửa",
    record: role,
  });
};

//[PATCH] /role/edit/:id
export const editPatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const role = await Role.updateOne(
      {
        _id: id,
      },
      req.body
    );
    res.redirect(PATH + "/role");
  } catch (error) {
    res.send("404 NOT FOUND");
  }
};
