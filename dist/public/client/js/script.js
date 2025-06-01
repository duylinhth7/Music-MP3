//SHOW Flash
function showFlashMessage(message) {
    // Tạo 1 thẻ div để chứa flash
    const flash = document.createElement('div');
    flash.className = 'flash-message';
    flash.textContent = message;

    // Gắn vào body
    document.body.appendChild(flash);

    // Cho flash tự biến mất sau 2-3 giây
    setTimeout(() => {
        flash.remove();
    }, 3000);
}

//End show flash


//Aplayer
const dataSong1 = document.querySelector("[datasong]");
const dataSinger1 = document.querySelector("[datasinger]");
if (dataSong1 && dataSinger1) {
    const dataSong = JSON.parse(dataSong1.getAttribute("datasong"));
    const dataSinger = JSON.parse(dataSinger1.getAttribute("datasinger"));
    const ap = new APlayer({
        container: document.querySelector("#aplayer"),
        lrcType: 1,
        audio: [{
            name: `${dataSong.title}`,
            artist: `${dataSinger.fullName}`,
            url: `${dataSong.audio}`,
            cover: `${dataSong.avatar}`,
            lrc: `${dataSong.lyrics}`
        }]
    });
    ap.on('ended', () => {
        const link = `/songs/view/${dataSong._id}`;
        fetch(link, { method: "PATCH" })
    })
}

//End Aplayer

//inner-favourite
const favourite = document.querySelector(".inner-favourite");
if (favourite) {
    favourite.addEventListener("click", () => {
        const dataSong = JSON.parse(dataSong1.getAttribute("datasong"));
        const idSong = dataSong._id;
        const isActive = favourite.classList.contains("active");
        const typeFavourite = isActive ? "unFavourite" : "favourite";
        const link = `/songs/favourite/${typeFavourite}/${idSong}`
        fetch(link, { method: "PATCH" })
            .then(res => res.json())
            .then(data => {
                if (data.code == 200) {
                    favourite.classList.toggle("active");
                    showFlashMessage("Cập nhật thành công!")
                } else {
                    showFlashMessage("Chưa đăng nhập!")
                }
            })
    })
}
//end inner-favourite

//Like
const like = document.querySelector(".inner-like");
if (like) {
    like.addEventListener("click", () => {
        const idUser = like.getAttribute("id-user");
        if (idUser) {
            const dataSong = JSON.parse(dataSong1.getAttribute("datasong"));
            const dataSinger = JSON.parse(dataSinger1.getAttribute("datasinger"));
            const idSong = dataSong._id;
            // const isLike = like.classList.contains("active");
            // const typeLike = isLike ? "unLike" : "like";
            const link = `/songs/like/${idSong}/${idUser}`;
            fetch(link, { method: "PATCH" })
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        const totalLike = data.totalLike;
                        const span = like.querySelector("span");
                        span.innerHTML = `${totalLike} thích`
                        like.classList.toggle("active");

                    } else {
                        showFlashMessage("Vui lòng đăng nhập!")
                    }
                })
        } else {
            showFlashMessage("Vui lòng đăng nhập!")
        }
    })
}
//End Like


//SEARCH SUGGESS
const formSearch = document.querySelector(".form-suggest");
if (formSearch) {
    const input = formSearch.querySelector("input[name='keyword']");
    input.addEventListener("keyup", () => {
        const keyword = input.value;
        const link = `/search/suggest?keyword=${keyword}`;
        fetch(link, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                if (data.code == 200) {
                    const innerSuggest = formSearch.querySelector(".inner-suggest");
                    innerSuggest.classList.add("show");
                    const htmls = data.songs.map(item => {
                        return `
                                    <a href="/songs/detail/${item.slug}" class="inner-item">
                                    <div class="inner-image">
                                        <img src=${item.avatar} alt=${item.title}>
                                    </div>
                                    <div class="inner-info">
                                        <div class="inner-title">${item.title}</div>
                                        <div class="inner-singer">${item.infoSinger.fullName}</div>
                                    </div>
                                    </a>
                             `;
                    });
                    const boxList = formSearch.querySelector(".inner-list");
                    boxList.innerHTML = htmls.join("");
                }
            })
        if(!keyword){
            const innerSuggest = formSearch.querySelector(".inner-suggest");    
            innerSuggest.classList.remove("show")
        }
    })
}
//END SEARCH SUGGEST