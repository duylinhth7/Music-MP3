import { Request, Response } from "express"
import Topics from "../../models/admin/topic.model";
import Song from "../../models/admin/song.model";
import Singers from "../../models/admin/singer.model";
import User from "../../models/client/user.model";


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

//[PATCH] /songs/favourite/:type/:idSong
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

//[PATCH] /songs/like/:type/:idSong
export const like = async (req: Request, res: Response):Promise<void> => {
    try {
        const idSong:string = req.params.idSong;
        const idUser:string = req.params.idUser;
        const checkIdUser = await User.findOne({
            _id: idUser,
            deleted: false,
            status: "active"
        });
        if(checkIdUser){
            const isLike = await Song.findOne({
                _id: idSong,
                like: idUser
            });
            const songUpdate = await Song.findOneAndUpdate({
                _id: idSong
            }, isLike ? { $pull: {like: idUser}} : { $push: {like: idUser}}, { new: true, select: "like" });
            if (!songUpdate) {
                res.json({
                    code: 404,
                    message: "Không tìm thấy bài hát!"
                });
                return;
            }
            res.json({
                code: 200,
                totalLike: songUpdate.like.length,
                message: "Cập nhật thành công!"
            });
        } else {
            res.json({
                code: 400,
                message: "Tài khoản không hợp lệ!"
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        });
    }


}


//PATCH /songs/view/idSong
export const view = async (req: Request, res: Response):Promise<void> => {
    const idSong:string = req.params.idSong;
    const song = await Song.findOne({
        _id: idSong
    }).select("view");
    const newView = song.view + 1;
    await Song.updateOne({
        _id: idSong
    }, {
        view: newView
    });
}