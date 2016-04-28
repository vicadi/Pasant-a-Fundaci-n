//Google analitycs 
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-62140207-1', 'auto');
  ga('send', 'pageview');

/*Variables Globales*/
  var ultimasEntradas={};
  var ultimasEntradasPrimarias={};
  var paginas={};
  var homeCargado=false;
  var vistaDonacion=false;
  var vistaEstrellas=false;
  var arrayColor=["#d273cd","#00bb41","#00c7fc","#36abd0","#8762ab","#fef000","#ffa700","#fe889b","#ff7f5b"];

/*Función principal*/
  $(document).ready(function() {

    /*Layout*/
      //posiciones();
      $(".navbar").css("top","0");
      $("#contenido").css("margin-top","4.6%");
      /*bootBox ingresar*/ 
        $("#aLogin").on("click",function(){
          bootbox.dialog({
            title: "Para administrar contenido debes validarte",
            message: '<div class="row" id="login">  ' +
              '<form id="formLogin" class="form-horizontal" method="POST" action="/user/login"> ' +
              '<input id="url" type="hidden" name="url" value="'+window.location.pathname+'"></input>'+
              '<div id="datos">'+
              '<input type="text" name="usuario" autofocus placeholder="Usuario" required></input>'+
              '<input type="password" name="contrasena" placeholder="Contraseña" required></input>'+
              '<button id="botonLogin" type="submit">Ingresar</button>'+
              '</div></form></div>'
          });
        });
      /*navbar*/
        $(function() {
          window.prettyPrint && prettyPrint()
          $(document).on('click', '.yamm .dropdown-menu', function(e) {
            e.stopPropagation()
          })
        })
      /*centrar menu*/
        var longitudDivMenu = $("#navbar-collapse-1").css("width").slice(0,-2);
        var paddingDivMenu = $("#navbar-collapse-1").css("padding-left").slice(0,-2);
        var longitudMenu=$("#navbar-collapse-1 ul#ulPrincipal").css("width").slice(0,-2);
        left = ((longitudDivMenu-longitudMenu)/2)-paddingDivMenu;
        $("#navbar-collapse-1 ul#ulPrincipal").css("margin-left",left+"px");
        var longitudVentana = $(window).width();
        var marginSubmenu = (longitudVentana-longitudMenu)/2;
        $("ul.submenus.dropdown-menu.colorSubmenu").css("margin", "0 "+marginSubmenu+"px");
      /*posicionFooter*/
        var heightFooter = ($("#piePagina").css("height")).slice(0,-2);
        var heightMenu = ($(".navbar").css("height")).slice(0,-2);
        var heightVentana = heightWindow()-heightFooter-heightMenu;
        $("#contenido").css("min-height",heightVentana+"px");    
      /*Boton subir*/
        $('.scrollup').click(function(){
          $("html, body").animate({ scrollTop: 0 }, 600);
          return false;
        });
      /*FlechaBajar*/
        $.fn.scrollBottom = function() { 
          return $(document).height() - this.scrollTop() - this.height() - 200; 
        };
        $('a.scrolldown').click(function(){
          $("html, body").animate({ scrollTop: $("#seccionesPrincipales").scrollBottom() }, 900);
          return false;
        });
      /*Formato fecha*/
        if($("#contenidoPagina #fecha #centro").attr("fecha")){
          var str=$("#contenidoPagina #fecha #centro").attr("fecha");
          var res = str.split(" ",4);
          var fecha=res[0]+" "+res[1]+"-"+res[2]+"-"+res[3];
          $("#contenidoPagina #fecha #centro span").text(fecha);
        }   
      /*Buscar*/
        $('#formularioBuscar').submit(function() {
          $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function(data) {
              var contador=0;
              $("#resultadoBuscar ul").empty();
              while(contador<data.length){
                $("#resultadoBuscar ul").append("<li><a href="+data[contador].nombreEnlace+"><span><b>"+data[contador].titulo+"</b></span><br><p>"+data[contador].descripcion+"</p></a></li>");
                if(contador<(data.length-1)){
                  $("#resultadoBuscar ul").append("<li class='linea'></li>");
                }
                contador++;
              }
            }
          })        
          return false;
        }); 
      /*Color Menu*/
        var cantidadMenu=$("#navbar-collapse-1 ul li.dropdown.yamm-fw").length;
        //$("#navbar-collapse-1 ul li.dropdown.yamm-fw").css("min-width",cantidadMenu+"%");
        for(var i=0;i<5;i++){
          var color = $("#navbar-collapse-1 ul li #colorMenu"+(i+1)).attr("color");
          if($("#navbar-collapse-1 ul li #colorMenu"+(i+1))){
            $("#navbar-collapse-1 ul li #colorMenu"+(i+1)).css("background-color", color);
          }
          if($("#navbar-collapse-1 ul li #colorSubmenu"+(i+1))){
            $("#navbar-collapse-1 ul li #colorSubmenu"+(i+1)).css("background-color", color);
          }
        }
        $("#navbar-collapse-1 ul li .colorMenu").each(function(element){
          $(this).css("visibility" , "visible");
        });
        /*
        $("#navbar-collapse-1 ul li a.dropdown-toggle").on("click",function(){
          var div=$(this).attr("idDiv");
          var li=$(this).attr("li");
          var submenu = $("#navbar-collapse-1 ul #"+li);
          $("#navbar-collapse-1 ul li .colorMenu").each(function(element){
            var id = $(this).attr("id");
            if(id==div && submenu.attr("class")!="dropdown yamm-fw open"){
              $(this).css("visibility" , "visible");
            }else{
              $(this).css("visibility" , "hidden");
            }
          });
        });*/
       /* Aqui hago que la barra de color de cada menu se muestre al hace hover----
        $("#navbar-collapse-1 ul li a.dropdown-toggle").mouseenter(function(){
          var div=$(this).attr("idDiv");
          var li=$(this).attr("li");
          var submenu = $("#navbar-collapse-1 ul #"+li);
          $("#navbar-collapse-1 ul li .colorMenu").each(function(element){
            var id = $(this).attr("id");
            if(id==div && submenu.attr("class")!="dropdown yamm-fw open"){
              $(this).css("visibility" , "visible");
            }else{
              $(this).css("visibility" , "hidden");
            }
          });
        });
        $("#navbar-collapse-1 ul li a.dropdown-toggle").mouseleave(function(){
          var div=$(this).attr("idDiv");
          var li=$(this).attr("li");
          var submenu = $("#navbar-collapse-1 ul #"+li);
          $("#navbar-collapse-1 ul li .colorMenu").each(function(element){
            var id = $(this).attr("id");
            if(id==div && submenu.attr("class")!="dropdown yamm-fw open"){
              $(this).css("visibility" , "hidden");
            }
          });
        }); */
   
    /*Mas Contenido*/
      $("ul.holder").sweetPages({perPage:10,altura:110});
      var controls = $('.swControls').detach();
      controls.appendTo('.main');
    
    /*Recuperar Contraseña
      if(window.location.pathname==="/user/recuperarContrasena"){
        $("#checkUsuario").on("click",function(){
          if($(this).is(':checked')){
            $("#checkCorreo").prop("checked",false);
            $("#inputUsuario").css("display","inherit");
            $("#inputCorreo").css("display","none");
            $("#inputUsuario").attr("required",true);
            $("#inputCorreo").attr("required",false);
          }else{
            $("#checkCorreo").prop("checked",true);
            $("#inputUsuario").css("display","none");
            $("#inputCorreo").css("display","inherit");
            $("#inputUsuario").attr("required",false);
            $("#inputCorreo").attr("required",true);
          }
        });
        $("#checkCorreo").on("click",function(){
          if($(this).is(':checked')){          
            $("#checkUsuario").prop("checked",false);
            $("#inputUsuario").css("display","none");
            $("#inputCorreo").css("display","inherit");
            $("#inputUsuario").attr("required",false);
            $("#inputCorreo").attr("required",true);
          }else{
            $("#checkUsuario").prop("checked",true);
            $("#inputUsuario").css("display","inherit");
            $("#inputCorreo").css("display","none");
            $("#inputUsuario").attr("required",true);
            $("#inputCorreo").attr("required",false);
          }
        });
      }*/  
   
    /*Selector de imagen*/
      $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
      });
      
      $(document).ready( function() {
        $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
            
            var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;
            
            if( input.length ) {
                input.val(log);
            } else {
                if( log ) alert(log);
            }          
        });
      });
    
    /*Acordeon*/
      function toggleChevron(e) {
        $(e.target)
          .prev('.panel-heading')
          .find("i.indicator")
          .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
      }
      $('.accordion').on('hidden.bs.collapse', toggleChevron);
      $('.accordion').on('shown.bs.collapse', toggleChevron); 

    /*Menu*/   
      if(window.location.pathname=="/admin/editarMenu"){
        /*Ocultar paneles*/
          $("#editarMenu #accordion").on('click','a.aEditar',function(){
            var titulo=$(this).attr('titulo'); 
            $("#editarMenu #accordion .panel-heading").css("display","inherit");
            $("#editarMenu #accordion #"+titulo).css("display","none");
          });
        /*Actualizar panel*/
          $("#editarMenu #accordion").on('click','a.aCancelar',function() {
            var panel=$(this).attr('panel');
            var panelCollapse=$(this).attr('panelCollapse');
            var titulo=$(this).attr('titulo');
            $('#'+panel).load(' #'+titulo+', #'+panelCollapse);
          });
          $("#editarMenu .nuevo").on('click','#aCancelar',function() {
            $('#nuevoMenu').load(' #menuNuevo');
          });
        /*Agregar submenu*/
          $("#editarMenu #accordion .panel.panel-primary .acciones").on('click', 'a.agregarSubmenu',function(){
            var tabla=$(this).attr('tabla');
            var panel=$(this).attr('panel');
            var filas=$('tr', '#'+tabla).length;
            if(filas===1){
              $("#editarMenu #accordion .seleccionUrl").css("display","none");
              $("#editarMenu #accordion .urlMenu").css("display","none");
              $("#editarMenu #accordion .tituloSubmenu").css("display","inherit");
              $("#editarMenu #accordion .table-responsive #"+tabla).css("display","inherit");
              $("#editarMenu #accordion .urlMenu #urlExterna").val("");
              $("#editarMenu #accordion .urlMenu #urlInterna option[value='none'").attr("selected",true);
              $("#editarMenu #accordion #seleccionUrl").attr('checked', false);
            }
            var opciones="";
            for(var i=0; i<paginas.length;i++){
              opciones+='<option value="'+paginas[i].nombreEnlace+'">'+paginas[i].titulo+'</option>';
            }
            $('#editarMenu #accordion .table-responsive #'+tabla+' > tbody:last').
              append('<tr id="'+(filas-1)+'" class="dato"><td>'+
                filas+'</td><td><input type="text" name="tituloSubmenu['+
              (filas-1)+']" required title=\'Titulo submenu requerido\'></input></td><td><input class="seleccionUrlSubmenu" name="seleccionUrlSubmenu['+
              (filas-1)+']" type="checkbox" interna="urlInternaSubmenu'+
              (filas-1)+'" externa="urlExternaSubmenu'+(filas-1)+'"'+
              (filas-1)+'"></input><input type="hidden" name="valorUrlSubmenu['+
              (filas-1)+']"></input></td><td><input type="url" name="urlExternaSubmenu['+
              (filas-1)+']" placeholder="http://www.ejemplo.com" id="urlExternaSubmenu'+
              (filas-1)+'"></input><select style="display:none" id="urlInternaSubmenu'+
              (filas-1)+'" name="urlInternaSubmenu['+(filas-1)+']" id="urlInternaSubmenu'+
              (filas-1)+'" class="form-control"><option value="none">Seleccione una opción</option>'+opciones
              +'</select></td><td><span/></td><td><span/></td><td><a href="javascript:void(0);" onclick="cancelar_eliminarSubmenu('+
              (filas-1)+',\''+panel+'\',\'Cancelar\')"> Cancelar </a></td></tr>');
            $("#editarMenu #accordion .seleccionUrlSubmenu").on("click",function() { 
              var interna = $(this).attr("interna");
              var externa = $(this).attr("externa");
              if($(this).is(':checked')) {  
                $("#editarMenu #accordion .table-responsive #"+tabla+" #"+externa).css("display","none");
                $("#editarMenu #accordion .table-responsive #"+tabla+" #"+externa).val("");
                $("#editarMenu #accordion .table-responsive #"+tabla+" #"+interna).css("display","inherit");
              } else {  
                $("#editarMenu #accordion .table-responsive #"+tabla+" #"+externa).css("display","inherit");
                $("#editarMenu #accordion .table-responsive #"+tabla+" #"+interna).css("display","none"); 
                $("#editarMenu #accordion .table-responsive #"+tabla+" #"+interna+" option[value='none'").attr("selected",true);
              }  
            });       
          });
        /*Url interna o externa*/
          $("#editarMenu #accordion #seleccionUrl").on("click",function() { 
            if($(this).is(':checked')) {  
              $("#editarMenu #accordion #urlExterna").css("display","none");
              $("#editarMenu #accordion #urlExterna").val("");
              $("#editarMenu #accordion #urlInterna").css("display","inherit");
            } else {  
              $("#editarMenu #accordion #urlExterna").css("display","inherit");
              $("#editarMenu #accordion #urlInterna").css("display","none"); 
              $("#editarMenu #accordion #urlInterna option[value='none'").attr("selected",true);
            }  
          });
          $("#editarMenu #accordion .seleccionUrlSubmenu").on("click",function() { 
            var interna = $(this).attr("interna");
            var externa = $(this).attr("externa");
            if($(this).is(':checked')) {  
              $("#editarMenu #accordion .table-responsive table #"+externa).css("display","none");
              $("#editarMenu #accordion .table-responsive table #"+externa).val("");
              $("#editarMenu #accordion .table-responsive table #"+interna).css("display","inherit");
            } else {  
              $("#editarMenu #accordion .table-responsive table #"+externa).css("display","inherit");
              $("#editarMenu #accordion .table-responsive table #"+interna).css("display","none"); 
              $("#editarMenu #accordion .table-responsive table #"+interna+" option[value='none'").attr("selected",true);
            }  
          });
        /*Menu nuevo*/
          $("#agregarMenu").click(function(){
            $("#menuNuevo").css("display","inherit");
          });
          $("#editarMenu #nuevoMenu #menuNuevo").on('click','#agregarSubmenuMenuNuevo',function(){
            var filas=$("tr","#menuNuevo table").length;
            if(filas==1){
              $("#editarMenu #nuevoMenu #menuNuevo .seleccionUrl").css("display","none");
              $("#editarMenu #nuevoMenu #menuNuevo .urlMenu").css("display","none");
              $("#editarMenu #nuevoMenu #menuNuevo .tituloSubmenu").css("display","inherit");
              $("#editarMenu #nuevoMenu #menuNuevo #tablaMenuNuevo").css("display","inherit");
              $("#editarMenu #nuevoMenu #menuNuevo .urlMenu #urlExterna").val("");
              $("#editarMenu #nuevoMenu #menuNuevo .urlMenu #urlInterna option[value='none'").attr("selected",true);
              $("#editarMenu #nuevoMenu #menuNuevo #seleccionUrl").attr('checked', false);
            }
            var opciones='';
            for(var i=0; i<paginas.length;i++){
              opciones+='<option value="'+paginas[i].nombreEnlace+'">'+paginas[i].titulo+'</option>';
            }
            $('#editarMenu #menuNuevo table  > tbody:last').
                append('<tr id="'+(filas-1)+'" class="dato"><td>'+filas
                +'</td><td><input type="text" name="tituloSubmenu['+
                (filas-1)+']" required title=\'Titulo submenu requerido\'></input></td><td><input class="seleccionUrlSubmenu" name="seleccionUrlSubmenu['+
                (filas-1)+']" type="checkbox" externa="urlExternaSubmenu'+
                (filas-1)+'" interna="urlInternaSubmenu'+
                (filas-1)+'"'+
                (filas-1)+'"/><input type="hidden" value="off" name="valorUrlSubmenu['+
                (filas-1)+']" id="valorUrlSubmenu'+
                (filas-1)+'"/></td><td><input type="url" name="urlExternaSubmenu['+
                (filas-1)+']" id="urlExternaSubmenu'+
                (filas-1)+'" placeholder="http://www.ejemplo.com"></input><select style="display:none" id="urlInternaSubmenu'+
                (filas-1)+'" name="urlInternaSubmenu['+
                (filas-1)+']" class="form-control"><option value="none" selected>Seleccione una opción</option>'+opciones
                +'</select></td><td><a href="javascript:void(0);" onclick="cancelar_eliminarSubmenu('+
                (filas-1)+',\'panelMenuNuevo\',\'Cancelar\')"> Cancelar </a></td></tr>');
            //Url submenu interna o externa
              $("#editarMenu #menuNuevo table .seleccionUrlSubmenu").click(function() { 
                var interna = $(this).attr("interna");
                var externa = $(this).attr("externa");
                if($(this).is(':checked')) {  
                  $("#editarMenu #menuNuevo table #"+externa).css("display","none");
                  $("#editarMenu #menuNuevo table #"+externa).val("");
                  $("#editarMenu #menuNuevo table #"+interna).css("display","inherit");
                } else {  
                  $("#editarMenu #menuNuevo table #"+externa).css("display","inherit");
                  $("#editarMenu #menuNuevo table #"+interna).css("display","none"); 
                  $("#editarMenu #menuNuevo table #"+interna+" option[value='none'").attr("selected",true);
                }  
              });
          });
        /*Url menu interna o externa*/
          $("#editarMenu #nuevoMenu #menuNuevo #seleccionUrl").on("click",function() { 
            if($(this).is(':checked')) {  
              $("#editarMenu #nuevoMenu #menuNuevo #urlExterna").css("display","none");
              $("#editarMenu #nuevoMenu #menuNuevo #urlExterna").val("");
              $("#editarMenu #nuevoMenu #menuNuevo #urlInterna").css("display","inherit");
            } else {  
              $("#editarMenu #nuevoMenu #menuNuevo #urlExterna").css("display","inherit");
              $("#editarMenu #nuevoMenu #menuNuevo #urlInterna").css("display","none"); 
              $("#editarMenu #nuevoMenu #menuNuevo #urlInterna option[value='none']").attr("selected",true);
            }  
          });
       
          /*Confirmación de elimar menu*/
            $("#editarMenu #accordion .panel.panel-primary .acciones").on('click', 'a.eliminarMenu',function(){
              var menu=$(this).attr('menu');
              var enlace=$(this).attr('enlace');
              bootbox.confirm("¿Eliminar menu "+menu+"?", function(result) {    
                if(result){
                  document.location.href=enlace;
                }      
              }); 
            });
      }
    
    /*Editar Pagina*/
      /*Confirmación de elimar pagina*/
      $("#editarPaginas table").on('click', 'a.eliminarPagina', function(){
        var pagina=$(this).attr('pagina');
        var enlace=$(this).attr('enlace');
        bootbox.confirm("¿Eliminar pagina "+pagina+"?", function(result) {    
          if(result){
            $("#editarPaginas table a.eliminarPagina").attr('href', "/admin/pagina/borrar/"+enlace);
            document.location.href=$("#editarPaginas table a.eliminarPagina").attr('href');
          }      
        }); 
      });      
      /*Id url video*/
        $(".enlaceVideo").on('keyup',function(){
          var enlaceYoutube = $(this).val();
          var id=idVideoYoutube(enlaceYoutube);
          $(".idVideo").val(id);
        });

    /*vista donacion*/
      if(vistaDonacion){
        $("#paginaDonacion #formulario").css("display", "none");
        $("#paginaDonacion #confirmacion").css("display", "inherit");
      }else{
        $("#paginaDonacion #formulario").css("display", "inherit");
        $("#paginaDonacion #confirmacion").css("display", "none");
      }

      /*redirecciones pagina donacion*/
        $("#paginaDonacion #confirmacion #tiempoEspecie").on("click",function(){
          bootbox.alert("Muchas gracias por tu apoyo, pronto estaremos en contacto!!", function(result){
            location.href="/";
          });
        });
    
    /*Vista estrellas*/
      if(vistaEstrellas){
        $("#paginaEstrellas #formulario").css("display", "none");
        $("#paginaEstrellas #confirmacionEstrellas").css("display", "inherit");
      }else{
        $("#paginaEstrellas #formulario").css("display", "inherit");
        $("#paginaEstrellas #confirmacionEstrellas").css("display", "none");
      }
    
      /*input cantidad*/
      $("#paginaDonacion #formulario #opciones #dinero #checkDinero").on("click",function() { 
        if($("#paginaDonacion #formulario #opciones #dinero #checkDinero").is(':checked')) {  
          $("#paginaDonacion #formulario #cantidad").css("display", "inherit");  
          $("#paginaDonacion #formulario #cantidad").attr("required", true);
        } else {  
          $("#paginaDonacion #formulario #cantidad").css("display", "none");
          $("#paginaDonacion #formulario #cantidad").attr("required", false);
        } 
      });
    
      /*Valor label estrellas*/
      $("#paginaEstrellas #formulario #numEstrellas #estrellas").on('keyup',function(){
        var valorEstrellas=$("#paginaEstrellas #formulario #numEstrellas #estrellas").val();
        if(valorEstrellas=="" || valorEstrellas=="0")
          var valorFinal="000000";
        else
          var valorFinal=valorEstrellas*30000;
        $("#paginaEstrellas #formulario #dinero #valorEstrellas").val(valorFinal);
      });     
    
    /*home*/
      if(window.location.pathname=="/"){
        var posicionColor= Math.floor(Math.random()*(8-0+1))+0; 
        /*Cargar Slider*/
          $(function() {
            var Page = (function() {
              var $navArrows = $( '#nav-arrows' ).hide(),
                $navDots = $( '#nav-dots' ).hide(),
                $nav = $navDots.children( 'span' ),
                $shadow = $( '#shadow' ).hide(),
                slicebox = $( '#sb-slider' ).slicebox( {
                  onReady : function() {
                    $navArrows.show();
                    $navDots.show();
                    $shadow.show();
                  },
                  orientation : 'r',
                  cuboidsCount : 5,
                  disperseFactor : 20,
                  autoplay: true,
                  interval: 6000,
                  onBeforeChange : function( pos ) {
                    $nav.removeClass( 'nav-dot-current' );
                    $nav.eq( pos ).addClass( 'nav-dot-current' );
                  }
                }),            
                init = function() {
                  initEvents();              
                },
                initEvents = function() {
                  // add navigation events
                  $navArrows.children( ':first' ).on( 'click', function() {
                    slicebox.next();
                    return false;
                  });
                  $navArrows.children( ':last' ).on( 'click', function() {                
                    slicebox.previous();
                    return false;
                  });
                  $nav.each( function( i ) {              
                    $( this ).on( 'click', function( event ) {                  
                      var $dot = $( this );                  
                      if( !slicebox.isActive() ) {
                        $nav.removeClass( 'nav-dot-current' );
                        $dot.addClass( 'nav-dot-current' );                  
                      }                  
                      slicebox.jump( i + 1 );
                      return false;                
                    });                
                  });
                };
                return { init : init };
            })();
            Page.init();
          });
        /*Fin Cargar Slider*/ 
        /*llenar divs home*/
          llenarCards(ultimasEntradas);
          var cardNueva = llenarCardsPrincipales(ultimasEntradasPrimarias[0],"cardFisico");      
          $( "#contenido #seccionesPrincipales #cards" ).find( ".card" ).eq( 3 ).before(cardNueva);  
          cardNueva = llenarCardsPrincipales(ultimasEntradasPrimarias[3],"cardEmocional");      
          $( "#contenido #seccionesPrincipales #cards" ).find( ".card" ).eq( 4 ).before(cardNueva); 
          cardNueva = llenarCardsPrincipales(ultimasEntradasPrimarias[1],"cardEspiritual");   
          $( "#contenido #seccionesPrincipales #cards" ).find( ".card" ).eq( 6 ).before(cardNueva); 
          /*Banner
          var banner = $("<div id='banner'></div>");
          $( "#contenido #seccionesPrincipales #cards" ).find( ".card" ).eq( 4 ).before(banner); */
        /*Imagenes y color Aleatorios Slider*/
          /*for(var i=0; i<arrayImagenesSlider.length;i++){
            var img = $('<img src="'+arrayImagenesSlider[usados[i]].src+'">');
            var h3 = $('<h3 style="font-size:14px">'+arrayImagenesSlider[usados[i]].descripcion+'</h3>')
            var a = $('<a href="'+arrayImagenesSlider[usados[i]].url+'"><div class="divLinkImagen"><b style="font-size:14px">LEER +</b></div></a>');
            var div = $('<div class="sb-description"></div>');
            div.append(h3);
            div.append(a);
            var li = $('<li/>');
            li.append(img);
            li.append(div);
            $("#sb-slider").append(li);
          }
          if($(window).width()>800){
            $("#slider").mouseenter(function() {
              $(this).css('background-color',arrayColor[posicionColor]);
              $(this).css('transition','background-color 2s');
            });
            $("#slider").mouseleave(function() {
              $(this).css('background-color','white');
              $(this).css('transition','background-color 2s');
            });
          }else{*/
            $("#slider").css('background-color',arrayColor[posicionColor]);
          /*}*/
        /*mas contenido en home*/
          var anchoVentana = $(window).width();
          var padding = (anchoVentana-1100)/2;
          $("#masContenido").css("padding","2% "+padding+"px");
      } 
    
    /*Slider*/
      if(window.location.pathname=="/admin/editarslider"){
        $(".accordion a.aEditar").html("Editar");
        $("#agregarSlider").on("click",function(){
          $("#sliderNuevo").css("display","inherit");
        });
        $(".nuevo #cancelarNuevo").on('click',function() {
          $('.nuevoElemento').load(' .nuevo');
        });
        $(".accordion a.aEditar").on('click',function(){
          var panel=$(this).attr("panel");
          var id=$(this).attr("id");
          var display = $("#"+panel).css("display");
            if(display=="none")
              $(".accordion a#"+id).html("Cancelar");
            else
              $(".accordion a#"+id).html("Editar");
          });
        $(".accordion .botonEliminarSlider").on('click', function(){
              var slider=$(this).attr('slider');
              var enlace=$(this).attr('enlace');
              bootbox.confirm("¿Eliminar elemento de slider "+slider+"?", function(result) {    
                if(result){
                  document.location.href=enlace;
                }      
              }); 
            });
      }

  });

/*Funciones*/
  var usados= new Array();

  function cancelar_eliminarSubmenu(id,panel,accion){
    var tabla=$("#editarMenu #"+panel+" button").attr('tabla');
    bootbox.confirm("¿"+accion+" submenu?", function(result) {
      if(result){
        $("#editarMenu #"+tabla+" #"+id).remove();
        if($("tr","#editarMenu #"+tabla).length!=1){
          var i=1;
          $('#'+tabla+' tr.dato').each(function () {
            var td=$(this).find("td").eq(0);
            td.html(i);
            this.id=i-1;
            $(this).find("td").eq(1).find("input").attr('name','tituloSubmenu['+(i-1)+']');
            $(this).find("td").eq(2).find("input").attr('name','urlSubmenu['+(i-1)+']');
            $(this).find("td").eq(3).find("a").attr('onclick','cancelar_eliminarSubmenu('+(i-1)+', "'+panel+'")');
            i++;
          });
        }else{
          $("#editarMenu #"+panel+" .seleccionUrl").css("display","inherit");
          $("#editarMenu #"+panel+" .urlMenu").css("display","inherit");
          $("#editarMenu #"+panel+" .tituloSubmenu").css("display","none");
          $("#editarMenu #"+panel+" #"+tabla).css("display","none");        
        }        
      }
    });
  }  

  function repetido(num){ 
    var repe= false; 
    for (i=0; i<usados.length; i++) { 
      if (num == usados[i]) { 
        repe = true; 
      } 
    } 
    return repe; 
  } 

  function aleatorio(min, max){ 
    while (repe !== false) { 
      var num= Math.floor(Math.random()*(max-min+1))+min; 
      var repe = repetido(num); 
    } 
    usados.push(num); 
    return num; 
  } 

  function posiciones(){
    for(var i=0; i<5; i++){
      aleatorio(0,4);
    }
  }
  function llenarCardsPrincipales(estructura,id){
    var divContenidoCard = $("<div class='contenidoCard'></div>");
    if(estructura){
      if(estructura.idVideo){
        var divVideoDescripcion = $("<div class='videoDescripcion'></div>");
        var a=$("<a rel='shadowbox;width=605;height=500;' title="+estructura.titulo+" href='http://www.youtube-nocookie.com/embed/"
          +estructura.idVideo+"?autoplay=1&fs=1&hd=1&rel=0&showsearch=0&showinfo=0&iv_load_policy=3&loop=1&theme=light&modestbranding=1&autohide=1'></a>");
        var img = $("<img src='http://img.youtube.com/vi/"+estructura.idVideo+"/1.jpg' style='width: 100%;height: 150px;'></img>");
        a.append(img);
        divVideoDescripcion.append(a);
        var divDescripcion = $("<div class='descripcion'></div>");
        var p = $("<p>"+estructura.descripcion+"</p>");
        divDescripcion.append(p);
        divContenidoCard.append(divVideoDescripcion);
        divContenidoCard.append(divDescripcion);
      }else if(estructura.linkImagen){
        var divImagenDescripcion = $("<div class='imagenDescripcion'></div>");
        var img = $("<img src='"+estructura.linkImagen+"'></img>");
        divImagenDescripcion.append(img);
        var divDescripcion = $("<div class='descripcion'></div>");
        var p = $("<p>"+estructura.descripcion+"</p>");
        divDescripcion.append(p);
        divContenidoCard.append(divImagenDescripcion);
        divContenidoCard.append(divDescripcion);
      }else{
        var divDescripcionSinImagen = $("<div class='descripcionSinImagen'></div>");
        var p = $("<p>"+estructura.descripcion+"</p>");
        divDescripcionSinImagen.append(p);
        divContenidoCard.append(divDescripcionSinImagen);
      }
      var a = $("<a href='/"+estructura.nombreEnlace+"'></a>");
      var divLeerMas = $("<div class='leerMas'>LEER +</div>");
      a.append(divLeerMas);
      divContenidoCard.append(a);
      var card= $("<div class='card'></div>");
      card.attr("id",id);
      card.append(divContenidoCard);
      return card;  
    }
    
  }
  function llenarCards(entradas){
    for(var i=0;i<entradas.length;i++){
      if(entradas[i]){
        var contenidoCard = $("<div class='contenidoCard'></div>");
        if(entradas[i].idVideo){
          var videoDescripcion = $("<div class='videoDescripcion'></div>");
          var a=$("<a rel='shadowbox;width=605;height=500;' title="+entradas[i].titulo+" href='http://www.youtube-nocookie.com/embed/"
          +entradas[i].idVideo+"?autoplay=1&fs=1&hd=1&rel=0&showsearch=0&showinfo=0&iv_load_policy=3&loop=1&theme=light&modestbranding=1&autohide=1'></a>");
          var img = $("<img src='http://img.youtube.com/vi/"+entradas[i].idVideo+"/1.jpg' style='width: 100%;height: 150px;'></img>");
          a.append(img);
          videoDescripcion.append(a);
          var descripcion = $("<div class='descripcion'></div>");
          var p = $("<p>"+entradas[i].descripcion+"</p>");
          descripcion.append(p);
          contenidoCard.append(videoDescripcion);
          contenidoCard.append(descripcion);
        }else if(entradas[i].linkImagen){
          var imagenDescripcion =$("<div class='imagenDescripcion'></div>");
          var img = $("<img src='"+entradas[i].linkImagen+"'/>");
          imagenDescripcion.append(img);
          var descripcion = $("<div class='descripcion'></div>");
          var p = $("<p>"+entradas[i].descripcion+"</p>");
          descripcion.append(p);
          contenidoCard.append(imagenDescripcion);
          contenidoCard.append(descripcion);
        }else{
          var descripcionSinImagen = $("<div class='descripcionSinImagen'></div>");
          var p2 = $("<p>"+entradas[i].descripcion+"</p>");
          descripcionSinImagen.append(p2);
          contenidoCard.append(descripcionSinImagen);
        }
        var a = $("<a></a>");
        a.attr("href","/"+entradas[i].nombreEnlace);
        var leerMas = $("<div class='leerMas'>LEER +</div>");
        a.append(leerMas);
        var card= $("<div class='card'></div>");
        card.append(contenidoCard);
        card.append(a);
        $("#seccionesPrincipales #cards").append(card);
      }
    }
  }
  $.fn.reset = function () {
    $(this).each (function() { this.reset(); });
  }

  function heightWindow() {
    var myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
      //No-IE
      myHeight = window.innerHeight;
    } else if( document.documentElement && document.documentElement.clientHeight) {
      //IE 6+
      myHeight = document.documentElement.clientHeight;
    } else if( document.body && document.body.clientHeight) {
      //IE 4 compatible
      myHeight = document.body.clientHeight;
    }
    return myHeight;
  }

  function idVideoYoutube(enlace){
    var enlace = enlace;
    var id=enlace.split("v=")[1];
    return id; 
  }