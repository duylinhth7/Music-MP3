import { Request, Response } from "express";
import unidecodeText from "../../helpers/unidecode";
import Song from "../../models/admin/song.model";
import Topics from "../../models/admin/topic.model";
import Singers from "../../models/admin/singer.model";
export const search = async (req: Request, res:Response):Promise<void> => {
    let newSongs = [];
    const typeSearch:string = req.params.typeSearch;
    const keyword:string = `${req.query.keyword}`;
    if(keyword){
        let keywordRegex:RegExp = new RegExp(keyword, "i"); 
        const slug = unidecodeText(keyword);
        const stringSlugRegex = new RegExp(slug, "i");
        const songs = await Song.find({
            $or: [
                {title: keywordRegex},
                {slug: stringSlugRegex}
            ]
        });
        if(songs){
            for(const item of songs){
                const singer = (await Singers.findOne({_id:item.singerId}));
                newSongs.push({
                    id: item.id,
                    avatar: item.avatar,
                    like: item.like,
                    slug: item.slug,
                    title: item.title,
                    updateAt: item.updatedAt,
                    infoSinger: singer
                });
            };
        };
        switch(typeSearch){
            case "detail":
                res.render("client/pages/search/index", {
                    title: "Kết quả tìm kiếm",
                    songs: newSongs,
                    keyword: keyword
                });
                break;
            case "suggest":
                if(newSongs.length>0){
                    res.json({
                        code: 200,
                        message: "Tìm kiếm thành công!",
                        songs: newSongs
                    })
                } else {
                    res.json({
                        code: 400,
                        message: "Không tìm thấy kết quả!"
                    })
                }
        }
    }
}