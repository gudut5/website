const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('koleksi');
var selectedCollection = parseInt(myParam);
var data;
var intViewportWidth = window.innerWidth;
var numberElement = document.querySelector('#numberCollection');
var coverImg = document.getElementById('imgSrc');
getKoleksi(myParam)
document.addEventListener('DOMContentLoaded', function() {
    
});
function setCoverImg(imgUrl){
    coverImg.setAttribute('src', imgUrl);
}
function getKoleksi(koleksi){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://historiadotid.s3.ap-southeast-1.amazonaws.com/balai_kirti/data.json', true);
    
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        data = JSON.parse(request.responseText);
        updatePage(selectedCollection)
      } else {
        // We reached our target server, but it returned an error
    
      }
    };
    request.onerror = function() {
        // There was a connection error of some sort
      };
      
    request.send();
}
var previousCollection = document.querySelector('a.button-link.left');
var nextCollection = document.querySelector('a.button-link.right');
nextCollection.addEventListener('click', function(event) {
    if(selectedCollection < 25){
        selectedCollection += 1;
        updatePage(selectedCollection);
    }
    
});
previousCollection.addEventListener('click', function(event) {
    if(selectedCollection > 1){
        selectedCollection -= 1;
        updatePage(selectedCollection);
    }
});
function updatePage(collection){
    numberElement.innerHTML = collection;
    document.title = "Balai Kirti Koleksi "+collection;
    urlPath = '?koleksi='+collection;
    window.history.pushState({"pageTitle":"Balai Kirti Koleksi "+collection},"", urlPath);
    for(i=0;i<data.artikel.length;i++){
        if(data.artikel[i].id == collection){
            document.getElementById('headerTitle').innerHTML = data.artikel[i].title;
            document.getElementById('year').innerHTML = new Date().getFullYear(data.artikel[i].date_published);
            document.getElementById('writer').innerHTML = data.artikel[i].writer;
            document.getElementById('publisher').innerHTML = data.artikel[i].publisher;
            document.getElementById('imgThumbnail').setAttribute('src', data.artikel[i].slide_thumbnail);
            document.getElementById('contentTitle').innerHTML = data.artikel[i].title;
            document.getElementById('contentTaicing').innerHTML = data.artikel[i].taicing;
            document.getElementById('contentText').innerHTML = data.artikel[i].content;
            if(intViewportWidth > 768){
                setCoverImg(data.artikel[i].cover_desktop);
            }else{
                setCoverImg(data.artikel[i].cover_mobile);
            }
        }
    }
}