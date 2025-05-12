import { Request, Response } from "express";
import Accounts from "../../models/admin/account.model";
import Role from "../../models/admin/role.model";
import md5 from "md5";
import { systemConfig } from "../../config/system";

const PATH = systemConfig.prefixAdmin;

//[GET] /accounts/index
export const index = async (req: Request, res: Response): Promise<void> => {
  const accounts = await Accounts.find({
    deleted: false,
  }).select("-password");
  res.render("admin/pages/accounts/index", {
    title: "Danh sách tài khoản",
    record: accounts,
  });
};

//[GET] /accounts/create
export const create = async (req: Request, res: Response): Promise<void> => {
  const roles = await Role.find({
    deleted: false,
  });
  res.render("admin/pages/accounts/create", {
    title: "Thêm tài khoản admin",
    roles: roles,
  });
};

//[POST] /accounts/create
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    req.body.password = md5(req.body.password);
    const email: string = req.body.email;
    const exitsEmail = await Accounts.findOne({
      email: email,
    });
    if (exitsEmail) {
      console.log("Email này đã tồn tại");
      res.redirect(PATH + "/accounts/");
    } else {
      const newAccount = new Accounts(req.body);
      await newAccount.save();
      res.redirect(PATH + "/accounts/");
    }
  } catch (error) {
    res.send("404 NOT FOUND!");
  }
};

//[GET] /accounts/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;
  const account = await Accounts.findOne({
    _id: id,
    deleted: false,
  });
  const roles = await Role.find({ deleted: false });
  res.render("admin/pages/accounts/edit", {
    title: "Chỉnh sửa tài khoản admin",
    account: account,
    roles: roles,
  });
};

//[PATCH] /accounts/edit/:id
export const editPatch = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.email;
  const id: string = req.params.id;
  req.body.password = md5(req.body.password);
  const exitsEmail = await Accounts.findOne({
    _id: { $ne: id },
    email: email,
  });
  if(exitsEmail){
    console.log("Email này đã tồn tại");
    return;
  } else {
    await Accounts.updateOne({
        _id: id
    }, req.body)
  };
  res.redirect(PATH + "/accounts/")
};
