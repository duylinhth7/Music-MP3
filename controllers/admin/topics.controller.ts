import { Request, Response } from "express";
import Topics from "../../models/admin/topic.model";
import panigationHelper from "../../helpers/panigation";
import { systemConfig } from "../../config/system";
import unidecodeText from "../../helpers/unidecode";

const PATH: string = systemConfig.prefixAdmin;
// [GET] /topics/index
export const index = async (req: Request, res: Response) => {
  let find = {};

  //Panigation
  const countTopics = await Topics.countDocuments();
  const objectPanigation = panigationHelper(
    {
      currentPage: 1,
      limitItems: 3,
    },
    req.query,
    countTopics
  );
  //End Panigation

    //search
    if (req.query.keyword) {
      const keyword: string = `${req.query.keyword}`;
      const keywordRegex: RegExp = new RegExp(keyword, "i");
      const slug = unidecodeText(keyword);
      const stringSlugRegex = new RegExp(slug, "i");
      find["$or"] = [{ title: keywordRegex }, { slug: stringSlugRegex }];
    }
  
    //end search

  const topics = await Topics.find(find)
    .limit(objectPanigation.limitItems)
    .skip(objectPanigation.skipItems);
  res.render("admin/pages/topics/index", {
    topics: topics,
    title: "Danh sách chủ đề",
    panigation: objectPanigation,
  });
};

//[GET] /topics/create
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/topics/create", {
    title: "Thêm chủ đề mới",
  });
};

//[POST] /topics/create
export const createPost = async (req: Request, res: Response) => {
  try {
    let position: number;
    let avatar: string = "";
    if (req.body.position) {
      position = parseInt(req.body.position);
    } else {
      position = (await Topics.countDocuments({})) + 1;
    }
    if (req.body.avatar) {
      avatar = req.body.avatar;
    }
    const record = {
      title: req.body.title,
      featured: req.body.featured,
      description: req.body.description,
      position: position,
      status: req.body.status,
      avatar: avatar,
    };
    const newTopic = new Topics(record);
    await newTopic.save();
    res.redirect(PATH + "/topics");
  } catch (error) {
    res.redirect("back");
  }
};

//[GET] /topics/edit/:id
export const edit = async (req: Request, res: Response) => {
    const idTopic:string = req.params.id;
    const topic = await Topics.findOne({
        _id: idTopic
    })
    res.render("admin/pages/topics/edit", {
        title:  "Chỉnh sửa chủ đề",
        topic: topic
    })
}

//[PATCH] /topics/edit/:id
export const editPatch = async(req:Request, res:Response):Promise<void> => {
    try {
        const idTopic:string = req.params.id;
        await Topics.updateOne({
            _id: idTopic
        }, req.body);
        res.redirect(PATH + "/topics")
    } catch (error) {
        res.redirect("back")
    }
}

//[PATCH] /topcis/changeStatus/:id/:status
export const changeStatus =  async (req:Request, res:Response):Promise<void> => {
    try {
        const id:string = req.params.id;
        const statusChange:string = req.params.status;
        await Topics.updateOne({
            _id: id
        }, {
            status: statusChange
        });
        res.json({
            code: 200,
            message: "Thay đổi trạng thái thành công!"
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Thay đổi trạng không thái thành công!"
        });
    }

}

//[DELETE] /topics/delete/:id
export const deleteTopic =  async (req:Request, res:Response):Promise<void> => {
    try {
        const id:string = req.params.id;
        await Topics.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedAt: new Date
        });
        res.json({
            code: 200,
            message: "Xóa thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}
