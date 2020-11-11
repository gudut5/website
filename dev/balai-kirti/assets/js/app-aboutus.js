
document.addEventListener('DOMContentLoaded', function() {
    var intViewportWidth = window.innerWidth;
    var coverImg = document.getElementById('cover-image');
    var desktopImg = coverImg.getAttribute('data-desktop');
    var mobileImg = coverImg.getAttribute('data-mobile');
    if(intViewportWidth > 767){
        setCoverImg(desktopImg,'desktop');
    }else{
        setCoverImg(mobileImg,'mobile');
    }
})
function setCoverImg(imgUrl,typeView){
    var coverImg = document.getElementById('cover-image');
    var oImg = document.createElement("img");
    oImg.setAttribute('src', imgUrl);
    oImg.setAttribute('alt', 'cover '+typeView);
    coverImg.appendChild(oImg);
}