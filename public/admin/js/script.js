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
