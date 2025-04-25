//Aplayer
const dataSong = JSON.parse(document.querySelector("[datasong]").getAttribute("datasong"));
const dataSinger = JSON.parse(document.querySelector("[datasinger]").getAttribute("datasinger"));
if (dataSong && dataSinger) {
    const ap = new APlayer({
        container: document.querySelector("#aplayer"),
        audio: [{
            name: `${dataSong.title}`,
            artist: `${dataSinger.fullName}`,
            url: `${dataSong.audio}`,
            cover: `${dataSong.avatar}`
        }]
    });
}

//End Aplayer

//inner-favourite
const favourite = document.querySelector(".inner-favourite");
if (favourite) {
    favourite.addEventListener("click", () => {
        const idSong = dataSong._id;
        const isActive = favourite.classList.contains("active");
        const typeFavourite = isActive ? "unFavourite" : "favourite";
        const link = `/songs/favourite/${typeFavourite}/${idSong}`
        fetch(link, {method: "PATCH"})
            .then(res => res.json())
            .then(data => {
                if (data.code == 200) {
                    favourite.classList.toggle("active");
                } else {
                    alert("Chưa đăng nhập!")
                }
            })
    })
}
//end inner-favourite

//Like
const like = document.querySelector(".inner-like");
if(like) {
    like.addEventListener("click", () => {
        const idUser = like.getAttribute("id-user");
        if(idUser){
            const idSong = dataSong._id;
            // const isLike = like.classList.contains("active");
            // const typeLike = isLike ? "unLike" : "like";
            const link = `/songs/like/${idSong}/${idUser}`;
            fetch(link, {method: "PATCH"})
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        const totalLike = data.totalLike;
                        const span = like.querySelector("span");
                        span.innerHTML = `${totalLike} thích`
                        like.classList.toggle("active");

                    } else {
                        alert("Chưa đăng nhập!")
                    }
                })
        }
    })
}
//End Like