import { Request, Response } from "express"
import Song from "../../models/client/song.model"
import Singers from "../../models/client/singer.model";
import Topics from "../../models/client/topic.model";


// [GET] /songs/index
export const index = async (req:Request, res:Response):Promise<void> => {
    const songs = await Song.find({
        deleted: false,
        status: "active"
    }).select("-description -lyrics");
    for(const song of songs){
        const singer = await Singers.findOne({_id: song.singerId}).select("fullName");
        song["infoSinger"] = singer;
        const topic = await Topics.findOne({_id: song.topicId}).select("title");
        song["topic"] = topic
    }
    res.render("admin/pages/songs/index", {
        title: "Danh sách bài hát",
        songs: songs
    })
}

//[GET] /songs/create
export const create = async (req:Request, res:Response):Promise<void> => {
    const topics = await Topics.find({status: "active"}).select("title");
    const singers = await Singers.find({}).select("fullName");
    res.render("admin/pages/songs/create", {
        title: "Thêm bài hát",
        topics: topics,
        singers: singers
    })
}
