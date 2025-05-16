import { Request, Response } from "express"
import Song from "../../models/admin/song.model"
import Singers from "../../models/admin/singer.model";

// [GET] /
export const home = async (req:Request, res:Response):Promise<void> => {
    const songFeatured = await Song.find({
        deleted: false,
        featured: "1"
    });
    const singers = await Singers.find({
        status: "active"
    });
    for(const song of songFeatured){
        const singer = await Singers.findOne({
            _id: song.singerId
        }).select("fullName");
        song["singer"] = singer.fullName
    }
    res.render("client/pages/home/index", {
        title: "Trang chủ",
        songFeatured: songFeatured,
        singers: singers
    })
}