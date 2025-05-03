import { Request, Response } from "express"
import Topics from "../../models/admin/topic.model"

export const topic = async (req: Request, res:Response):Promise<void> => {
    const topics = await Topics.find({
        status: "active"
    });
    res.render("client/pages/topics/index", {
        title: "Danh sách chủ đề",
        topics: topics
    })
}