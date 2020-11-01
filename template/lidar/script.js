document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', myFunctionStepBg);
    var bodyEl = document.getElementsByTagName("body")[0];
    var step01 = true, step02 = true, step03 = true, step04 = true, step05 = true, step06 = true, step07 = true, step08 = true, step09 = true, step10 = true;
    function hideBg(){
      var elBg = document.getElementsByClassName("isBg");
      var totalBg = elBg.length;
      for (let index = 0; index < totalBg; index++) {
        elBg[index].classList.add("removeBg");
      }
    }
    function myFunctionStepBg() {
      var bg1 = document.getElementById("step01"),topBg1 = bg1.offsetTop;
      var bg2 = document.getElementById("step02-1"),topBg2 = bg2.offsetTop;
      var bg3 = document.getElementById("step02-2"),topBg3 = bg3.offsetTop;
      var bg4 = document.getElementById("step03-1"),topBg4 = bg4.offsetTop;
      var bg5 = document.getElementById("step03-2"),topBg5 = bg5.offsetTop;
      var bg6 = document.getElementById("step04-1"),topBg6 = bg6.offsetTop;
      var bg7 = document.getElementById("step04-2"),topBg7 = bg7.offsetTop;
      var bg8 = document.getElementById("step05-1"),topBg8 = bg8.offsetTop;
      var bg9 = document.getElementById("step05-2"),topBg9 = bg9.offsetTop;
      var bg10 = document.getElementById("step05-3"),topBg10 = bg10.offsetTop;
      var bgLast = document.getElementById("step05-4"),topBgLast = bgLast.offsetTop;
      
      if (window.pageYOffset >= topBg1) {bg1.classList.add("removeBg");} else {bg1.classList.remove("removeBg");}
      if (window.pageYOffset >= topBgLast) {bgLast.classList.add("bg10");} else {bgLast.classList.remove("bg10");}
      if (window.pageYOffset >= topBg1 && window.pageYOffset < topBg2) {
        if(step01){
          bodyEl.style.backgroundImage =  'url(https://historiadotid.s3.ap-southeast-1.amazonaws.com/lidar/01.jpg)';
          step01 = false;
          hideBg()
        }
      }else{
        step01 = true;
      }
      if (window.pageYOffset >= topBg2 && window.pageYOffset < topBg3) {
        if(step02){
          bodyEl.style.backgroundImage =  'url(https://historiadotid.s3.ap-southeast-1.amazonaws.com/lidar/02-1.jpg)';
          step02 = false;
          hideBg()
        }
      }else{
        step02 = true;
      }
      if (window.pageYOffset >= topBg3 && window.pageYOffset < topBg4) {
        if(step03){
          bodyEl.style.backgroundImage =  'url(https://historiadotid.s3.ap-southeast-1.amazonaws.com/lidar/02-2.jpg)';
          step03 = false;
          hideBg()
        }
      }else{
        step03 = true;
      }
      if (window.pageYOffset >= topBg4 && window.pageYOffset < topBg5) {
        if(step04){
          bodyEl.style.backgroundImage =  'url(https://historiadotid.s3.ap-southeast-1.amazonaws.com/lidar/03-1.jpg)';
          step04 = false;
          hideBg()
        }
      }else{
        step04 = true;
      }
      if (window.pageYOffset >= topBg5 && window.pageYOffset < topBg6) {
        if(step05){
          bodyEl.style.backgroundImage =  'url(https://historiadotid.s3.ap-southeast-1.amazonaws.com/lidar/03-2.jpg)';
          step05 = false;
          hideBg()
        }
      }else{
        step05 = true;
      }
      if (window.pageYOffset >= topBg6 && window.pageYOffset < topBg7) {
        if(step06){
          bodyEl.style.backgroundImage =  'url(https://historiadotid.s3.ap-southeast-1.amazonaws.com/lidar/04-1.jpg)';
          step06 = false;
          hideBg()
        }
      }else{
        step06 = true;
      }
      if (window.pageYOffset >= topBg7 && window.pageYOffset < topBg8) {
        if(step07){
          bodyEl.style.backgroundImage =  'url(https://historiadotid.s3.ap-southeast-1.amazonaws.com/lidar/04-2.jpg)';
          step07 = false;
          hideBg()
        }
      }else{
        step07 = true;
      }
      if (window.pageYOffset >= topBg8 && window.pageYOffset < topBg9) {
        if(step08){
          bodyEl.style.backgroundImage =  'url(https://historiadotid.s3.ap-southeast-1.amazonaws.com/lidar/05-1.jpg)';
          step08 = false;
          hideBg()
        }
      }else{
        step08 = true;
      }
      if (window.pageYOffset >= topBg9 && window.pageYOffset < topBg10) {
        if(step09){
          bodyEl.style.backgroundImage =  'url(https://historiadotid.s3.ap-southeast-1.amazonaws.com/lidar/05-2.jpg)';
          step09 = false;
          hideBg()
        }
      }else{
        step09 = true;
      }
      if (window.pageYOffset >= topBg10 && window.pageYOffset < topBgLast) {
        if(step10){
          bodyEl.style.backgroundImage =  'url(https://historiadotid.s3.ap-southeast-1.amazonaws.com/lidar/05-3.jpg)';
          step10 = false;
          hideBg()
        }
      }else{
        step10 = true;
      }
    }
    document.getElementById("shareFB").onclick = function(){
      window.open(
        'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href), 
        'facebook-share-dialog', 
        'width=626,height=436');
      return false;
    }
    document.getElementById("shareTwitter").onclick = function(){
      window.open(
          'https://twitter.com/intent/tweet?text=Cara Kerja Teknologi LIDAR di Dunia Arkeologi. Klik disini>> https://Historia.id/microsite/cara-kerja-teknologi-lidar-di-dunia-arkeologi',
          '_blank'
      );
      return false;
    }
    document.getElementById("shareWhatsapp").onclick = function(){
      window.open(
          'whatsapp://send?text=' + encodeURIComponent(location.href),
          '_blank'
      );
      return false;
    }
    document.getElementById("shareLine").onclick = function(){
      window.open(
          'https://line.me/R/msg/text/?' + encodeURIComponent(location.href),
          '_blank'
      );
      return false;
    }
    
    document.getElementById("shareMail").onclick = function(){
      window.open(
          'mailto:?subject=Cara Kerja Teknologi LIDAR di Dunia Arkeologi. Klik disini>> https://Historia.id/microsite/cara-kerja-teknologi-lidar-di-dunia-arkeologi',
          '_blank'
      );
      return false;
    }
  })