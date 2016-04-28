$(document).ready(function(){
  var indice=6;
  var ocupado=false;
  var masContenido=true;
  function agregarContenidoScroll(){
    if(masContenido){
      $('div#agregarContenidoScroll').html('<img src="images/loader.gif"/>');
      $.post("/agregarContenidoScroll", {"indice":indice} , function(data){
        if (data != "") {
          setTimeout(function(){ 
              llenarCards(data);
              ocupado=false;
              $('div#agregarContenidoScroll').empty();
              indice+=4;
          }, 3000);
        }else{
          $('div#agregarContenidoScroll').empty();
          $('div#agregarContenidoScroll').html('FIN DE LAS PUBLICACIONES');
          masContenido=false;
        }
      });
    }
  };

  $(window).scroll(function(){
    var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
    var  scrolltrigger = 0.95;
      if  ((wintop/(docheight-winheight)) > scrolltrigger) {
        if(!ocupado){
          ocupado=true;
          agregarContenidoScroll();
        }
         }
  });
});