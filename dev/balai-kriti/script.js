var menu = false;
document.addEventListener('DOMContentLoaded', function() {
    var intViewportWidth = window.innerWidth;
    var coverImg = document.getElementById('cover-image');
    var desktopImg = coverImg.getAttribute('data-desktop');
    var mobileImg = coverImg.getAttribute('data-mobile');
    if(intViewportWidth > 768){
        setCoverImg(desktopImg,'desktop');
    }else{
        setCoverImg(mobileImg,'mobile');
    }
    document.getElementById("previous").onclick = function(){
        var numberCollection = document.getElementById("numberCollection").innerText;
        var setNumber = 1;
        if(parseInt(numberCollection) > 1){
            setNumber = parseInt(numberCollection) - 1;
        }
        document.getElementById("numberCollection").innerHTML = setNumber;
    }
    document.getElementById("next").onclick = function(){
        var numberCollection = document.getElementById("numberCollection").innerText;
        var setNumber = 25;
        if(parseInt(numberCollection) < 25){
            setNumber = parseInt(numberCollection) + 1;
        } 
        document.getElementById("numberCollection").innerHTML = setNumber;
    }
})
function setCoverImg(imgUrl,typeView){
    var coverImg = document.getElementById('cover-image');
    var oImg = document.createElement("img");
    oImg.setAttribute('src', imgUrl);
    oImg.setAttribute('alt', 'cover '+typeView);
    coverImg.appendChild(oImg);
}
