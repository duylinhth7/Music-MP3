import { Request, Response } from "express";
import Song from "../../models/admin/song.model";
import Singers from "../../models/admin/singer.model";
import Topics from "../../models/admin/topic.model";
import { systemConfig } from "../../config/system";
import panigationHelper from "../../helpers/panigation";
import unidecodeText from "../../helpers/unidecode";

const PATH = systemConfig.prefixAdmin;
// [GET] /songs/index
export const index = async (req: Request, res: Response): Promise<void> => {
  let find = {
    deleted: false,
  };
  //Panigation
  const countSongs = await Song.countDocuments({ deleted: false });
  const objectPanigation = panigationHelper(
    {
      currentPage: 1,
      limitItems: 3,
    },
    req.query,
    countSongs
  );
  //End Panigation

  //search
  if (req.query.keyword) {
    const keyword: string = `${req.query.keyword}`;
    const keywordRegex: RegExp = new RegExp(keyword, "i");
    const slug = unidecodeText(keyword);
    const stringSlugRegex = new RegExp(slug, "i");
    find["$or"] = [{ title: keywordRegex }, { slug: stringSlugRegex }];
  }

  //end search

  const songs = await Song.find(find)
    .select("-description -lyrics")
    .limit(objectPanigation.limitItems)
    .skip(objectPanigation.skipItems);
  for (const song of songs) {
    const singer = await Singers.findOne({ _id: song.singerId }).select(
      "fullName"
    );
    song["infoSinger"] = singer;
    const topic = await Topics.findOne({ _id: song.topicId }).select("title");
    song["topic"] = topic;
  }

  res.render("admin/pages/songs/index", {
    title: "Danh sách bài hát",
    songs: songs,
    panigation: objectPanigation,
  });
};

//[GET] /songs/create
export const create = async (req: Request, res: Response): Promise<void> => {
  const topics = await Topics.find({ status: "active" }).select("title");
  const singers = await Singers.find({}).select("fullName");
  res.render("admin/pages/songs/create", {
    title: "Thêm bài hát",
    topics: topics,
    singers: singers,
  });
};

//[POST] /songs/create
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    interface Song {
      title: string;
      topicId: string;
      singerId: string;
      featured: string;
      description?: string;
      lyrics?: string;
      position?: number;
      status: string;
      avatar: string;
      audio: string;
    }
    let position = 0;
    if (req.body.position) {
      position = req.body.position;
    } else {
      position = await Song.countDocuments({ deleted: false });
    }
    const song: Song = {
      title: req.body.title,
      topicId: req.body.topicId,
      singerId: req.body.singerId,
      featured: req.body.featured,
      description: req.body.description,
      lyrics: req.body.lyrics,
      position: position,
      status: req.body.status,
      avatar: req.body.avatar[0],
      audio: req.body.audio[0],
    };
    const newSong = new Song(song);
    await newSong.save();
    res.redirect(`${PATH}/songs`);
  } catch (error) {}
};

//[GET] /songs/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
  const idSong: string = req.params.id;
  const song = await Song.findOne({
    _id: idSong,
    deleted: false,
  });
  const topics = await Topics.find({});
  const singers = await Singers.find({
    status: "active",
  });
  song["topicName"] = topics.find((item) => item.id == song.topicId);
  song["singerName"] = singers.find((item) => item.id == song.singerId);
  res.render("admin/pages/songs/edit", {
    title: "Chỉnh sửa bài hát",
    song: song,
    topics: topics,
    singers: singers,
  });
};

// [PATCH] /songs/edit
export const editPatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const dataUpdate = req.body;
    const idSong: string = req.params.id;
    await Song.updateOne(
      {
        _id: idSong,
      },
      dataUpdate
    );
    res.redirect(PATH + "/songs");
  } catch (error) {
    res.redirect("back");
  }
};

//[DELETE] /songs/delete/:id
export const deleteSong = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const idSong: string = req.params.id;
    await Song.updateOne(
      {
        _id: idSong,
      },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );
    res.json({
      code: 200,
      message: "Xóa bài hát thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};

//[PATCH] /songs/changeStatus/:id/:status
export const changeStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const idSong: string = req.params.id;
    const statusChange: string = req.params.status;
    await Song.updateOne(
      {
        _id: idSong,
      },
      {
        status: statusChange,
      }
    );
    res.json({
      code: 200,
      message: "Thay đổi trạng thái thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thay đổi trạng không thái thành công!",
    });
  }
};

//[PATCH] /songs/change-mutil
export const changeMutil = async (
  req: Request,
  res: Response
): Promise<void> => {
  const idsArray = req.body.ids.split(",");
  const typeEdit: string = req.body.type;
  switch (typeEdit) {
    case "delete":
      await Song.updateMany(
        {
          _id: { $in: idsArray },
        },
        {
          deleted: true,
          deletedAt: Date.now(),
        }
      );
      res.redirect(PATH + "/songs");
      break;

    case "active":
      await Song.updateMany(
        {
          _id: { $in: idsArray },
        },
        {
          status: "active",
        }
      );
      res.redirect(PATH + "/songs");
      break;
    case "inactive":
      await Song.updateMany(
        {
          _id: { $in: idsArray },
        },
        {
          status: "inactive",
        }
      );
      res.redirect(PATH + "/songs");
      break;
  }
};
