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

//Xóa bài hát
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete){
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const idSong = button.getAttribute("data-id");
            const link = `${PATH}/songs/delete/${idSong}`;
            const isConfirm = confirm("Bạn có muốn xóa bài hát này không?");
            if(isConfirm){
                fetch(link, {method: "DELETE"})
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if(data.code == 200) {
                            showFlashMessage(data.message);
                            location.reload();
                        } else  {
                            showFlashMessage(data.message)
                        }
                    })
            }
        })
    })
}
//End Xóa bài hát
