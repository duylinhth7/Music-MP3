import { Request, Response } from "express"
import Topics from "../../models/topic.model";
import Song from "../../models/song.model";
import Singers from "../../models/singer.model";


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
        });
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