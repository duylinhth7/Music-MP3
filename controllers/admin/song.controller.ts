import { Request, Response } from "express"
import Song from "../../models/admin/song.model"
import Singers from "../../models/admin/singer.model";
import Topics from "../../models/admin/topic.model";
import { systemConfig } from "../../config/system";

const PATH = systemConfig.prefixAdmin;
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


//[POST] /songs/create 
export const createPost = async (req:Request, res:Response):Promise<void> => {
    try {
        interface Song {
            title:string,
            topicId:string,
            singerId: string,
            featured: string,
            description?: string,
            lyrics?: string,
            position?: number,
            status: string
            avatar: string,
            audio: string
        };
        let position = 0;
        if(req.body.position){
            position = req.body.position
        } else {
            position = await Song.countDocuments({deleted: false});
        };
        const song:Song = {
            title: req.body.title,
            topicId: req.body.topicId,
            singerId: req.body.singerId,
            featured: req.body.featured,
            description: req.body.description,
            lyrics: req.body.lyrics,
            position: position,
            status: req.body.status,
            avatar: req.body.avatar[0],
            audio: req.body.audio[0]
        };
        const newSong = new Song(song);
        await newSong.save();
        res.redirect(`${PATH}/songs`);
    } catch (error) {
        
    }
}

//[GET] /songs/edit/:id
export const edit = async (req:Request, res:Response):Promise<void> => {
    const idSong:string = req.params.id;
    const song = await Song.findOne({
        _id: idSong,
        deleted: false
    });
    const topics = await Topics.find({});
    const singers = await Singers.find({
        status: "active"
    });
    song["topicName"] = topics.find(item => item.id == song.topicId);
    song["singerName"] = singers.find(item => item.id == song.singerId);
    res.render("admin/pages/songs/edit", {
        title: "Chỉnh sửa bài hát",
        song: song,
        topics: topics,
        singers: singers
    })
}

// [PATCH] /songs/edit
export const editPatch = async (req:Request, res:Response):Promise<void> => {
    try {
        const dataUpdate = req.body;
        const idSong:string = req.params.id
        await Song.updateOne({
            _id: idSong
        }, dataUpdate);
        res.redirect(PATH + "/songs")
    } catch (error) {
        res.redirect("back");
    }
}

//[DELETE] /songs/delete/:id
export const deleteSong =  async (req:Request, res:Response):Promise<void> => {
    try {
        console.log("ko")
        const idSong:string = req.params.id;
        await Song.updateOne({
            _id: idSong
        }, {
            deleted: true,
            deletedAt: new Date
        });
        res.json({
            code: 200,
            message: "Xóa bài hát thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}