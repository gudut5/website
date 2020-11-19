const urlParams = new URLSearchParams(window.location.search);
var myParam = urlParams.get('koleksi');
var selectedCollection = 1;

var data;
var intViewportWidth = window.innerWidth;
var numberElement = document.querySelector('#numberCollection');
var coverImg = document.getElementById('imgSrc');
var totalCollection = 25;
var slidersZoom = new Object()
document.addEventListener('DOMContentLoaded', function() {
    if(!isNaN(parseInt(myParam))) selectedCollection = parseInt(myParam);
    getKoleksi(selectedCollection)
});
const content = document.getElementById("barPosition");
const barNav = document.getElementById("barNav");
document.addEventListener("scroll", (e) => {

  var scrolled = document.scrollingElement.scrollTop;
  var position = content.offsetTop;
  if(scrolled > position){
    barNav.classList.add('fixedBar');
  }else{
    barNav.classList.remove('fixedBar');
  }
});
function setCoverImg(imgUrl){
    coverImg.setAttribute('src', imgUrl);
}
function getKoleksi(koleksi){
    var request = new XMLHttpRequest();
    request.open('GET', 'assets/data/data.json', true);
    
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
var previousCollection = document.querySelectorAll('a.button-link.left, .nav-bar-left');
var nextCollection = document.querySelectorAll('a.button-link.right, .nav-bar-right');
for (let i = 0; i < nextCollection.length; i++) {
    nextCollection[i].addEventListener("click", function() {
        if(selectedCollection < totalCollection){
            document.querySelector('.overlay').style.display = "";
            selectedCollection += 1;
            updatePage(selectedCollection);
        }
    });
}
for (let i = 0; i < previousCollection.length; i++) {
    previousCollection[i].addEventListener("click", function() {
        if(selectedCollection > 1){
            document.querySelector('.overlay').style.display = "";
            selectedCollection -= 1;
            updatePage(selectedCollection);
        }
    });
}
function updatePage(collection){
    numberElement.innerHTML = collection;
    document.title = "Balai Kirti Koleksi "+collection;
    urlPath = '?koleksi='+collection;
    window.history.pushState({"pageTitle":"Balai Kirti Koleksi "+collection},"", urlPath);
    for(i=0;i<data.artikel.length;i++){
        if(data.artikel[i].id == collection){
            var appendWritter = '';
            appendWritter += '<h4>Penulis</h4>';
            appendWritter += '<div class="detail-writter">';
            appendWritter += '<img src="'+data.artikel[i].foto_writer+'" alt="writter">';
            appendWritter += '<div class="detail-writter-content">';
            appendWritter += '<h4>'+data.artikel[i].writer+'</h4>';
            appendWritter += data.artikel[i].description_writer;
            appendWritter += '</div>';
            appendWritter += '</div>';
            appendWritter += '<div class="clear-float"></div>';

            document.getElementById('headerTitle').innerHTML = data.artikel[i].title;
            document.getElementById('year').innerHTML = new Date().getFullYear(data.artikel[i].date_published);
            document.getElementById('writer').innerHTML = data.artikel[i].writer;
            document.getElementById('publisher').innerHTML = data.artikel[i].publisher;
            document.getElementById('imgThumbnail').setAttribute('src', data.artikel[i].book_cover);
            document.getElementById('contentTitle').innerHTML = 'Buku '+data.artikel[i].title;
            document.getElementById('contentTaicing').innerHTML = data.artikel[i].taicing;
            document.getElementById('contentText').innerHTML = data.artikel[i].content+appendWritter;
            document.getElementById('captionThumbnail').innerHTML = data.artikel[i].caption_thumbnail;
            
            if(intViewportWidth > 768){
                setCoverImg(data.artikel[i].cover_desktop);
            }else{
                setCoverImg(data.artikel[i].cover_mobile);
            }
            coverImg.addEventListener('load', function(){
                document.querySelector('.overlay').style.display = "none";
            })
            if(typeof data.artikel[i].galery !== 'undefined'){
                var totalGalery = data.artikel[i].galery.length;
                if(totalGalery > 0){
                    document.getElementById('base_wrapper').innerHTML = '<div class="base" id="base"></div>';
                    var galery = data.artikel[i].galery;
                    var appendGallery = '';
                    var galCaption = '';
                    for(g=0;g<totalGalery;g++){
                        var indexG = g+1;
                        appendGallery += '<div class="item">';
                        appendGallery += '<img src="'+galery[g].url+'" alt="galery '+indexG+'" onclick="zoomImg(\''+galery[g].url+'\')">';
                        appendGallery += '<span class="only-mobile">'+galery[g].caption+'</span>';
                        appendGallery += '</div>';
                        if(g==0) galCaption = galery[g].caption;
                    }
                    document.getElementById('base').innerHTML = appendGallery;
                    document.getElementById('captionThumbnail').innerHTML = galCaption;
                    var doc = document,
                    speed = 400,
                    sliders = new Object(),
                    options = {
                        'base': {
                        container: '',
                        items: 1,
                        loop: false,
                        slideBy: 'page',
                        controlsText: ["&lsaquo;","&rsaquo;"]
                        }
                    };
                    var item = options['base'];
                    item.container = '#base';
                    item.swipeAngle = false;
                    if (!item.speed) { item.speed = speed; }

                    if (doc.querySelector(item.container)) {
                        sliders['base'] = tns(options['base']);
                    }
                    const buttonNav = document.querySelectorAll(".tns-controls button");

                    for (let b = 0; b < buttonNav.length; b++) {
                        buttonNav[b].addEventListener("click", function() {
                            setTimeout(function(){ 
                                document.getElementById('captionThumbnail').innerHTML = document.querySelector('.tns-slide-active span').innerHTML;
                            }, 500);
                            
                            
                        });
                    }
                    document.querySelector('.detail-galery').style.visibility = "visible";
                }else{
                    document.querySelector('.detail-galery').style.visibility = "hidden";
                    document.getElementById('base_wrapper').innerHTML = '';
                }
            }else{
                document.querySelector('.detail-galery').style.visibility = "hidden";
                document.getElementById('base_wrapper').innerHTML = '';
            }
        }
    }
}
function zoomImg(url){
    //document.getElementById('imgZoom').setAttribute('src', url);
    document.querySelector('.overlay-zoom').classList.remove('hide');
    document.querySelector('body').classList.add('fixedWH');
    for(i=0;i<data.artikel.length;i++){
        if(data.artikel[i].id == selectedCollection){
            if(typeof data.artikel[i].galery !== 'undefined'){
                var totalGalery = data.artikel[i].galery.length;
                if(totalGalery > 0){
                    var galery = data.artikel[i].galery;
                    var appendGallery = '';
                    var galCaption = '';
                    for(g=0;g<totalGalery;g++){
                        var indexG = g+1;
                        appendGallery += '<div class="item">';
                        appendGallery += '<img src="'+galery[g].url+'" alt="galery '+indexG+'">';
                        appendGallery += '<span>'+galery[g].caption+'</span>';
                        appendGallery += '</div>';
                        if(g==0) galCaption = galery[g].caption;
                    }
                    document.getElementById('galZoom').innerHTML = appendGallery;
                    var doc = document,
                    speed = 400,
                    options = {
                        'base': {
                        container: '',
                        items: 1,
                        loop: false,
                        slideBy: 'page',
                        controlsText: ["&lsaquo;","&rsaquo;"]
                        }
                    };
                    var item = options['base'];
                    item.container = '#galZoom';
                    item.swipeAngle = false;
                    if (!item.speed) { item.speed = speed; }

                    if (doc.querySelector(item.container)) {
                        slidersZoom['base'] = tns(options['base']);
                    }
                }
            }
        }
    }
    
}
function hideZoom(){
    document.querySelector('body').classList.remove('fixedWH');
    document.querySelector('.overlay-zoom').classList.add('hide');
    slidersZoom['base'].destroy();
}