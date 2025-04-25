import { Request, Response } from "express"
import Topics from "../../models/topic.model";
import Song from "../../models/song.model";
import Singers from "../../models/singer.model";
import User from "../../models/user.model";


//[GET] //songs/slugTopic
export const listSong = async (req:Request, res:Response):Promise<void> => {
    const slugTopic:string = req.params.slugTopic;
    try {
        const topic = await Topics.findOne({
            slug: slugTopic,
            status: "active"
        });

        const songs = await Song.find({
            topicId: topic.id
        }).select("title avatar singerId topicId like slug");

        for(const song of songs ){
            const infoSinger = await Singers.findOne({
                _id: song.singerId
            }).select("fullName");
            song["infoSinger"] = infoSinger.fullName;
        }
        // console.log(songs)

        res.render("client/pages/song/listSong", {
            title: topic.title,
            songs: songs
        })
    } catch (error) {
    };
}

//[GET] /songs/detail/:idSong
export const detailSong = async (req:Request, res:Response):Promise<void> => {
    try {
        const slugSong:string = req.params.slugSong;
        const song = await Song.findOne({
            slug: slugSong,
            deleted: false,
            status: "active"
        });
        const singer = await Singers.findOne({
            _id: song.singerId
        }).select("fullName slug");
        const topic = await Topics.findOne({
            _id: song.topicId
        });
        res.render("client/pages/song/detail",
            {
                title: song.title,
                song: song,
                singer: singer,
                topic: topic
            }
        )
    } catch (error) {
        
    }
}

//[PATCH] /song/favourite/:type/:idSong
export const favourite = async (req: Request, res: Response):Promise<void> => {
    try {
        if(res.locals.user){
            const userId:string = res.locals.user.id;
            const type: string = req.params.type;
            const idSong:string = req.params.idSong;
            if(type == "favourite"){
                await User.updateOne({
                    _id: userId
                }, {
                    $push: {favourite: idSong}
                });
                res.json({
                    code: 200,
                    message: "Thêm thành công!"
                });
            } else {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: {favourite: idSong}
                });
                res.json({
                    code: 200,
                    message: "Xóa khỏi danh sách yêu thích thành công!"
                })
            }
        } else {
            res.json({
                code: 400,
                message: "Vui lòng đăng nhập!"
            })
        }
    } catch (error) {
        
    }
}