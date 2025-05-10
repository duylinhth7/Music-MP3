import { Request, Response } from "express"
import Singers from "../../models/admin/singer.model"
import panigationHelper from "../../helpers/panigation";
import { systemConfig } from "../../config/system";
import { features } from "process";
import unidecodeText from "../../helpers/unidecode";
import { filterStatus } from "../../helpers/filterStatus";



const PATH = systemConfig.prefixAdmin;


// [GET] /singers/index
export const index = async(req:Request, res:Response):Promise<void> => {
    let find = {
        deleted: false
    };
    //Panigation
    const countSingers = await Singers.countDocuments({deleted: false});
    const objectPanigation = panigationHelper(
        {
            currentPage: 1,
            limitItems: 4
        },
        req.query,
        countSingers
    );
    //End Panigation

      //search
      if (req.query.keyword) {
        const keyword: string = `${req.query.keyword}`;
        const keywordRegex: RegExp = new RegExp(keyword, "i");
        const slug = unidecodeText(keyword);
        const stringSlugRegex = new RegExp(slug, "i");
        find["$or"] = [{ fullName: keywordRegex }, { slug: stringSlugRegex }];
      }
      //end search

      //Filter Status
      const filterStatusRecord = filterStatus(req.query);
      if(req.query.status){
        find["status"] = req.query.status
      }
      //End filter Status

    const singers = await Singers.find(find).limit(objectPanigation.limitItems).skip(objectPanigation.skipItems);
    res.render("admin/pages/singers/index", {
        title: "Danh sách ca sỹ",
        singers: singers,
        panigation: objectPanigation,
        filterStatus: filterStatusRecord
    })
}


//[PATCH] /singers/changeStatus/:id/:status
export const changeStatus =  async (req:Request, res:Response):Promise<void> => {
    try {
        const idSinger:string = req.params.id;
        const statusChange:string = req.params.status;
        await Singers.updateOne({
            _id: idSinger
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


//[GET] /singers/edit/:id
export const edit = async(req:Request, res:Response):Promise<void> => {
    const idSinger:string = req.params.id;
    const singer = await Singers.findOne({
        _id: idSinger
    })
    res.render("admin/pages/singers/edit", {
        title: "Chỉnh sửa thông tin ca sĩ",
        singer: singer
    })
}


//[PATCH] /singers/edit/:id
export const editPatch = async(req:Request, res:Response):Promise<void> => {
    try {
        const idSinger:string = req.params.id;
        await Singers.updateOne({
            _id: idSinger
        }, req.body);
        res.redirect(PATH + "/singers")
    } catch (error) {
        res.redirect("back")
    }
}

//[GET] /singers/create
export const create = async(req:Request, res:Response):Promise<void> => {
    res.render("admin/pages/singers/create", {
        title: "Thêm mới ca sĩ"
    })
}

//[POST] /singer/create
export const createPost = async(req:Request, res:Response):Promise<void> => {
    try {
        let position:number;
        let avatar:string = "";
        if(req.body.position){
            position = parseInt(req.body.position);
        } else {
            position = await Singers.countDocuments({}) + 1;
        };
        if(req.body.avatar){
            avatar = req.body.avatar;
        }
        const record = {
            fullName: req.body.fullName,
            featured: req.body.featured,
            description: req.body.description,
            position: position,
            status: req.body.status,
            avatar: avatar
        }
        const newSinger = new Singers(record);
        await newSinger.save();
        res.redirect(PATH + "/singers")
    } catch (error) {
        res.redirect("back");
    }
}

//[DELETE] /singers/delete/:id
export const deleteSinger =  async (req:Request, res:Response):Promise<void> => {
    try {
        const id:string = req.params.id;
        await Singers.updateOne({
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

//[PATCH] /singets/change-mutil
export const changeMutil = async (
  req: Request,
  res: Response
): Promise<void> => {
  const idsArray = req.body.ids.split(",");
  const typeEdit: string = req.body.type;
  switch (typeEdit) {
    case "delete":
      await Singers.updateMany(
        {
          _id: { $in: idsArray },
        },
        {
          deleted: true,
          deletedAt: Date.now(),
        }
      );
      res.redirect(PATH + "/singer");
      break;

    case "active":
      await Singers.updateMany(
        {
          _id: { $in: idsArray },
        },
        {
          status: "active",
        }
      );
      res.redirect(PATH + "/singer");
      break;
    case "inactive":
      await Singers.updateMany(
        {
          _id: { $in: idsArray },
        },
        {
          status: "inactive",
        }
      );
      res.redirect(PATH + "/singer");
      break;
  }
};