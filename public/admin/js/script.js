var PATH = "/admin";

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

//PREVIEW IMAGE
const inputImage = document.querySelector("[inputImage]");
const previewImage = document.querySelector("[previewImage]");
if(inputImage){
    inputImage.addEventListener("change", (e) => {
        const file = e.target.files[0];;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            previewImage.src = fileReader.result;
        }
        fileReader.readAsDataURL(file);
    })
};

const closePreview = document.querySelector(".close-preview");
if(closePreview){
    closePreview.addEventListener("click", () => {
        inputImage.value = "";
        previewImage.src="";
    })
}
//END PREVIEW IMAGE

//PREVIEW AUDIO
const inputAudio = document.querySelector("[inputAudio]");
const previewAudio =  document.querySelector("[previewAudio]");
if(inputAudio){
    inputAudio.addEventListener("change" , (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = () => {
            previewAudio.src = fileReader.result;
        }
        fileReader.readAsDataURL(file);
    })
}

const closePreviewAudio = document.querySelector(".close-preview-audio");
if(closePreviewAudio){
    closePreviewAudio.addEventListener("click", () => {
        inputAudio.value = "";
        previewAudio.src="";
    })
}
//END PREVIEW AUDIO

//Nút Xóa
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete){
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const idSong = button.getAttribute("data-id");
            const nameType = button.getAttribute("name-type")
            const link = `${PATH}/${nameType}/delete/${idSong}`;
            const isConfirm = confirm("Bạn có muốn xóa bài hát này không?");
            if(isConfirm){
                fetch(link, {method: "DELETE"})
                    .then(res => res.json())
                    .then(data => {
                        if(data.code == 200) {
                            setTimeout(() => {
                                location.reload()
                            }, 2000)
                            showFlashMessage(data.message);
                        } else  {
                            showFlashMessage(data.message)
                        }
                    })
            }
        })
    })
}
//End Nút Xóa


//button change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus){
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const statusCurrent = button.getAttribute("data-status");
            const nameType = button.getAttribute("name-type");
            const statusChange = statusCurrent === "active" ? "inactive" : "active";
            const link = `${PATH}/${nameType}/changeStatus/${id}/${statusChange}`;
            fetch(link, {method: "PATCH"})
                .then(res => res.json())
                .then(data => {
                    if(data.code == 200){
                        showFlashMessage(data.message);
                        setTimeout(() => {
                            location.reload()
                        }, 2000)
                    } else {
                        showFlashMessage("Lỗi, không thành công!")
                    }
                })
        })
    })
}
//End button change status


//panigation
const buttonPanigation = document.querySelectorAll("[button-panigation]");
buttonPanigation.forEach(button => {
    if (button) {
        const url = new URL(window.location.href);
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-panigation");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        })
    }
})
//end panigation