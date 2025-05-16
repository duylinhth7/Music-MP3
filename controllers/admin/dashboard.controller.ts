import { Request, Response } from "express"
import User from "../../models/client/user.model"
import Song from "../../models/admin/song.model";
import Singers from "../../models/admin/singer.model";
import Topics from "../../models/admin/topic.model";

export const index = async (req:Request, res:Response):Promise<void> => {
    const totalUser = await User.countDocuments({
        deleted: false
    });
    const totalSong = await Song.countDocuments({
        deleted: false,
        status: "active"
    });
    const totalSinger = await Singers.countDocuments({
        deleted: false
    });
    const totalTopic = await Topics.countDocuments({
        deleted: false
    })
    res.render("admin/pages/dashboard/index", {
        title: "Trang tổng quan",
        totalUser: totalUser,
        totalSong: totalSong,
        totalSinger: totalSinger,
        totalTopic: totalTopic
    })
}