document.addEventListener('DOMContentLoaded', function() {
    getKoleksi()
})
function setCoverImg(imgUrl,typeView){
    var coverImg = document.getElementById('cover-image');
    var oImg = document.createElement("img");
    oImg.setAttribute('src', imgUrl);
    oImg.setAttribute('alt', 'cover '+typeView);
    coverImg.appendChild(oImg);
}
function getKoleksi(){
    var request = new XMLHttpRequest();
    request.open('GET', 'assets/data/data.json', true);
    
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        data = JSON.parse(request.responseText);
        var intViewportWidth = window.innerWidth;
        if(intViewportWidth > 768){
            setCoverImg(data.cover,'desktop');
        }else{
            setCoverImg(data.cover_mobile,'mobile');
        }
      } else {
        // We reached our target server, but it returned an error
    
      }
    };
    request.onerror = function() {
        // There was a connection error of some sort
      };
      
    request.send();
}