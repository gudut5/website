var menu = false;
var totalCollection = 25;
var data;
var loadTitle;
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
        drawPage();
        drawSlider();
        drawList();
      } else {
        // We reached our target server, but it returned an error
    
      }
    };
    request.onerror = function() {
        // There was a connection error of some sort
      };
      
    request.send();
}
function drawSlider(){
    var appendText = '';
    var slideTitle = '', slideDesc = '';
    for(i=0;i<data.artikel.length;i++){
        appendText += '<div class="item" data-title="'+data.artikel[i].title+'" data-desc="'+data.artikel[i].taicing+'">';
        appendText += '<a href="detail.html?koleksi='+data.artikel[i].id+'">'
        appendText += '<img src="'+data.artikel[i].slide_thumbnail+'" alt="thumbnail-'+data.artikel[i].id+'">'
        appendText += '</a>'
        appendText += '</div>'
        if(i==0) {
            slideTitle = data.artikel[i].title;
            slideDesc = data.artikel[i].taicing;
        }
    }
    document.getElementById("pageTitle").innerHTML = slideTitle;
    document.getElementById("pageTaicing").innerHTML = slideDesc;
    document.getElementById('base').innerHTML = appendText;
    var doc = document,
    speed = 400,
    sliders = new Object(),
    options = {
        'base': {
        container: '',
        items: 1,
        loop: false,
        slideBy: 'page',
        swipeAngle: 30,
        touch: true,
        preventScrollOnTouch: true,
        prevButton: '#previous',
        nextButton: '#next',
        }
    };
    var item = options['base'];
    item.container = '#base';
    item.swipeAngle = false;
    if (!item.speed) { item.speed = speed; }

    if (doc.querySelector(item.container)) {
        sliders['base'] = tns(options['base']);
    }
    document.getElementById("previous").onclick = function(){
        var numberCollection = document.getElementById("numberCollection").innerText;
        var setNumber = 1;
        if(parseInt(numberCollection) > 1){
            setNumber = parseInt(numberCollection) - 1;
        }
        var info = sliders['base'].getInfo(),
        indexCurrent = info.index+1;
        document.getElementById("numberCollection").innerHTML = indexCurrent;
        clearTimeout(loadTitle);
        setTitle(sliders) 
    }
    document.getElementById("next").onclick = function(){
        var numberCollection = document.getElementById("numberCollection").innerText;
        var setNumber = 25;
        if(parseInt(numberCollection) < totalCollection){
            setNumber = parseInt(numberCollection) + 1;
        } 
        var info = sliders['base'].getInfo(),
        indexCurrent = info.index+1;
        document.getElementById("numberCollection").innerHTML = indexCurrent;
        clearTimeout(loadTitle);
        setTitle(sliders) 
    }       
    document.addEventListener('touchend', handleTouchMove, false);                                                   
    document.addEventListener('mousemove', handleTouchMove, false);                                          
    function handleTouchMove(evt) {
        clearTimeout(loadTitle);
        setTitle(sliders)                                      
    };
}
function setTitle(sliders){
    loadTitle = setTimeout(function(){ 
        var info = sliders['base'].getInfo(),
        indexCurrent = info.displayIndex;
        document.getElementById("numberCollection").innerHTML = indexCurrent;
        document.getElementById('pageTitle').innerHTML = document.querySelector('.tns-slide-active').getAttribute('data-title');
        document.getElementById("pageTaicing").innerHTML = document.querySelector('.tns-slide-active').getAttribute('data-desc');
    }, 500);
}
function drawList(){
    var appendText = '';
    var totalListBottom = 6;
    for(i=0;i<totalListBottom;i++){
        var splited = data.artikel[i].description_writer.match(/<[^> ]+[^>]*>[^<]*/g);
        var splitedDesc = '';
        if(splited !== null) splitedDesc = splited[0];
        
        var setList = 'even'
        if (i%2 == 0) setList = 'odd'
        appendText += '<div class="list-collection '+setList+' dflex">';
        appendText += '<div class="list-cover"><a href="detail.html?koleksi='+data.artikel[i].id+'"><img src="'+data.artikel[i].foto_writer+'" alt="foto writer"></a></div>';
        appendText += '<div class="list-detail">';
        appendText += '    <a href="detail.html?koleksi='+data.artikel[i].id+'" class="button-link"><span class="arrow right w48"></span></a>';
        appendText += '    <a href="detail.html?koleksi='+data.artikel[i].id+'"><h2>'+data.artikel[i].writer+'</h2></a>';
        appendText += splitedDesc+"..";
        appendText += '</div>';
        appendText += '</div>';
    }
    document.getElementById("listCollection").innerHTML = appendText;
}
function drawPage(){
    var intViewportWidth = window.innerWidth;
    if(intViewportWidth > 768){
        setCoverImg(data.cover,'desktop');
    }else{
        setCoverImg(data.cover_mobile,'mobile');
    }
    //document.getElementById("pageTitle").innerHTML = data.title;
    //document.getElementById("pageTaicing").innerHTML = data.taicing;
    var elements = document.querySelectorAll('.cover-header-text-small, .slide-header-text-small');
    elements.forEach(function(elem) {
        elem.innerHTML = data.koleksi_detail;
    });
    var elementsCover = document.querySelectorAll('.cover-header-text-large, .slide-header-text-large');
    elementsCover.forEach(function(elem) {
        elem.innerHTML = data.koleksi;
    });
    if(data.facebook != ''){
        document.getElementById('sosmedFacebook').setAttribute('href', data.facebook);
    }else{
        document.getElementById('sosmedFacebook').style.display = "none";
    }
    if(data.instagram != ''){
        document.getElementById('sosmedInstagram').setAttribute('href', data.instagram);
    }else{
        document.getElementById('sosmedInstagram').style.display = "none";
    }
    if(data.twitter != ''){
        document.getElementById('sosmedTwitter').setAttribute('href', data.twitter);
    }else{
        document.getElementById('sosmedTwitter').style.display = "none";
    }
    if(data.youtube != ''){
        document.getElementById('sosmedYoutube').setAttribute('href', data.youtube);
    }else{
        document.getElementById('sosmedYoutube').style.display = "none";
    }
    if(data.facebook == '' && data.instagram == '' && data.twitter == '' && data.youtube == ''){
        document.querySelector('.info-socmed-text').style.display = "none";
    }
    if(data.location != ''){
        document.querySelector('.info-map').setAttribute('href', data.location);
    }else{
        document.querySelector('.info-map').style.display = "none";
    }
}