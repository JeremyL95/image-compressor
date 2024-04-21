const btnUpload = document.querySelector('.upload-box');
const fileInput = btnUpload.querySelector("input");
const previewImage = document.querySelector('#imageDisplay');
const imageDisplay = document.querySelector('.image-display');
const widthInput = document.querySelector('.width input');
const heightInput = document.querySelector('.height input');
const ratioInput = document.querySelector('.ratio input');
const qualityInput = document.querySelector('.setting input');
const btnDownload = document.querySelector('.btn-download');

let ogImageRatio;
// let imageArray = []; 

const displayImage = (evt) => {
    // getting first user selected file
    const file = evt.target.files[0];

    // return if user hasn't selected any file
    if(!file) return;

    //passing selected file url to preview img src
    previewImage.src = URL.createObjectURL(file);
    previewImage.alt = "user-upload-image";

    previewImage.addEventListener('load', ()=>{
        widthInput.value = previewImage.naturalWidth;
        heightInput.value = previewImage.naturalHeight;
        ogImageRatio = previewImage.naturalWidth / previewImage.naturalHeight;
        btnUpload.classList.add('active');
    })

    // imageArray.push(file);
}

widthInput.addEventListener('keyup', ()=>{
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener('keyup', ()=>{
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
});

const compressedAndDownload = () =>{
    const canvas = document.createElement('canvas');
    const linkTag = document.createElement('a');
    const ctx = canvas.getContext('2d');

    const imageQuality = qualityInput.checked ? 0.8 : 1.0;

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height);
    linkTag.href = canvas.toDataURL("image/jpeg", imageQuality);
    linkTag.download = new Date().getTime();
    linkTag.click();
}

btnUpload.addEventListener('click', ()=>{
    fileInput.click();
});

btnDownload.addEventListener('click', compressedAndDownload);
fileInput.addEventListener('change', displayImage);
