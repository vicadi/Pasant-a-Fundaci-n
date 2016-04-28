
function menu_open(){
  jQuery('header nav a.abrir').click(function(){
    if(jQuery(this).hasClass('open')){
      jQuery(this).removeClass('open');
         jQuery('header').animate({
         'left':'-400px'
      }, 300 , "linear");
    }
    else{
        jQuery('header nav a.abrir').removeClass('open');
        jQuery(this).addClass('open');
         jQuery('header').animate({
         'left':'0'
      }, 300 , "linear");
    }       
  });
 }

function menu_rosado(){
  jQuery('nav #rosado').click(function(){
    if(jQuery(this).hasClass('rosado_')){
      jQuery(this).removeClass('rosado_');        
    }


    else{
        jQuery('nav a').removeClass();
        jQuery(this).addClass('open');
        jQuery(this).addClass('rosado_');
        
        jQuery('header section .rosado').fadeIn(300);
        jQuery('header section .naranja').fadeOut(300);
        jQuery('header section .morado').fadeOut(300);
        jQuery('header section .azulOscuro').fadeOut(300);
        jQuery('header section .azulClaro').fadeOut(300);
        jQuery('header section .verde').fadeOut(300);
        jQuery('header section .amarillo').fadeOut(300);
         /*jQuery('header nav.menu_principal li .menu_perfil').animate({
         'top':'100%'
      }, 300 , "linear");*/
    }       
  });
}

function menu_naranja(){
  jQuery('nav #naranja').click(function(){
    if(jQuery(this).hasClass('naranja_')){
      jQuery(this).removeClass('naranja_');        
    }
    else{
        jQuery('nav a').removeClass();
        jQuery(this).addClass('open');
        jQuery(this).addClass('naranja_');
        
        jQuery('header section .naranja').fadeIn(300);
        jQuery('header section .rosado').fadeOut(300);
        jQuery('header section .morado').fadeOut(300);
        jQuery('header section .azulOscuro').fadeOut(300);
        jQuery('header section .azulClaro').fadeOut(300);
        jQuery('header section .verde').fadeOut(300);
        jQuery('header section .amarillo').fadeOut(300);
         /*jQuery('header nav.menu_principal li .menu_perfil').animate({
         'top':'100%'
      }, 300 , "linear");*/
    }      
  });
}

function menu_morado(){
  jQuery('nav #morado').click(function(){
    if(jQuery(this).hasClass('morado_')){
      jQuery(this).removeClass('morado_');        
    }
    else{
        jQuery('nav a').removeClass();
        jQuery(this).addClass('open');
        jQuery(this).addClass('morado_');
        
        jQuery('header section .morado').fadeIn(300);
        jQuery('header section .naranja').fadeOut(300);
        jQuery('header section .rosado').fadeOut(300);            
        jQuery('header section .azulOscuro').fadeOut(300);
        jQuery('header section .azulClaro').fadeOut(300);
        jQuery('header section .verde').fadeOut(300);
        jQuery('header section .amarillo').fadeOut(300);
         /*jQuery('header nav.menu_principal li .menu_perfil').animate({
         'top':'100%'
      }, 300 , "linear");*/
    }       
  });
}

function menu_azulOscuro(){
  jQuery('nav #azulOscuro').click(function(){
    if(jQuery(this).hasClass('azulOscuro_')){
      jQuery(this).removeClass('azulOscuro_');        
    }
    else{
        jQuery('nav a').removeClass();
        jQuery(this).addClass('open');
        jQuery(this).addClass('azulOscuro_');
        
        jQuery('header section .azulOscuro').fadeIn(300);
        jQuery('header section .morado').fadeOut(300);
        jQuery('header section .naranja').fadeOut(300);
        jQuery('header section .rosado').fadeOut(300);            
        jQuery('header section .azulClaro').fadeOut(300);
        jQuery('header section .verde').fadeOut(300);
        jQuery('header section .amarillo').fadeOut(300);
         /*jQuery('header nav.menu_principal li .menu_perfil').animate({
         'top':'100%'
      }, 300 , "linear");*/
    }       
  });
}

function menu_azulClaro(){
  jQuery('nav #azulClaro').click(function(){
    if(jQuery(this).hasClass('azulClaro_')){
      jQuery(this).removeClass('azulClaro_');        
    }
    else{
        jQuery('nav a').removeClass();
        jQuery(this).addClass('open');
        jQuery(this).addClass('azulClaro_');
        
        jQuery('header section .azulClaro').fadeIn(300);
        jQuery('header section .azulOscuro').fadeOut(300);
        jQuery('header section .morado').fadeOut(300);
        jQuery('header section .naranja').fadeOut(300);
        jQuery('header section .rosado').fadeOut(300);            
        jQuery('header section .verde').fadeOut(300);
        jQuery('header section .amarillo').fadeOut(300);
         /*jQuery('header nav.menu_principal li .menu_perfil').animate({
         'top':'100%'
      }, 300 , "linear");*/
    }       
  });
}

function menu_verde(){
  jQuery('nav #verde').click(function(){
    if(jQuery(this).hasClass('verde_')){
      jQuery(this).removeClass('verde_');        
    }
    else{
        jQuery('nav a').removeClass();
        jQuery(this).addClass('open');
        jQuery(this).addClass('verde_');
        
        jQuery('header section .verde').fadeIn(300);
        jQuery('header section .azulClaro').fadeOut(300);
        jQuery('header section .azulOscuro').fadeOut(300);
        jQuery('header section .morado').fadeOut(300);
        jQuery('header section .naranja').fadeOut(300);
        jQuery('header section .rosado').fadeOut(300);            
        jQuery('header section .amarillo').fadeOut(300);
         /*jQuery('header nav.menu_principal li .menu_perfil').animate({
         'top':'100%'
      }, 300 , "linear");*/
    }       
  });
}

function menu_amarillo(){
  jQuery('nav #amarillo').click(function(){
    if(jQuery(this).hasClass('amarillo_')){
      jQuery(this).removeClass('amarillo_');        
    }
    else{
        jQuery('nav a').removeClass();
        jQuery(this).addClass('open');
        jQuery(this).addClass('amarillo_');
        
        jQuery('header section .amarillo').fadeIn(300);
        jQuery('header section .verde').fadeOut(300);
        jQuery('header section .azulClaro').fadeOut(300);
        jQuery('header section .azulOscuro').fadeOut(300);
        jQuery('header section .morado').fadeOut(300);
        jQuery('header section .naranja').fadeOut(300);
        jQuery('header section .rosado').fadeOut(300);            
        jQuery('header section .amarillo').fadeIn(300);
         /*jQuery('header nav.menu_principal li .menu_perfil').animate({
         'top':'100%'
      }, 300 , "linear");*/
    }       
  });
}

jQuery(document).ready(function(){
  menu_open();
  menu_rosado();
  menu_naranja();
  menu_morado();
  menu_azulOscuro();
  menu_azulClaro();
  menu_verde();
  menu_amarillo();
});