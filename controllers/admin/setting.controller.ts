import { Request, Response } from "express";
import SettingsGeneral from "../../models/admin/setting-general.model";
import { systemConfig } from "../../config/system";

const PATCH = systemConfig.prefixAdmin;
// [GET] /settings/general
export const general = async (req: Request, res: Response): Promise<void> => {
  const settings = await SettingsGeneral.findOne({});
  res.render("admin/pages/settings/general", {
    title: "Trang cài đặt chung",
    settings: settings,
  });
};

// [PATCH] /settings/general
export const generalPatch = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const countSettings = await SettingsGeneral.countDocuments({});
    const settingUpdate = await SettingsGeneral.findOne({});
    if (countSettings === 0) {
      const newSetting = new SettingsGeneral(req.body);
      newSetting.save();
      res.redirect(PATCH + "/settings/general");
    } else {
      await SettingsGeneral.updateOne(
        {
          _id: settingUpdate.id,
        },
        req.body
      );
      res.redirect(PATCH + "/settings/general");
    }
  } catch (error) {}
};
