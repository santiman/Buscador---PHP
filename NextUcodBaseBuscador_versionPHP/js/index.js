$( document ).ready(function() {
		$( "#buscar" ).click(function() {
			cargarCasas();
		});
	});

function insertarOfertas(casas) {
   forEach(casas,function(elemento){
  		var insertar = "<div class="'card horizontal ofertas'"><div class="'card-image'"><img src="'img/home.jpg'"></div><div class="'card-stacked'"><div class="'card-content'"><div><b>Direccion: " + elemento.Direccion +
      "</b><p></p></div><div><b>Ciudad: " + elemento.Ciudad +
      "</b><p></p></div><div><b>Telefono: " + elemento.Telefono +
      "</b><p></p></div><div><b>Código postal: " + elemento.Codigo_Postal +
      "</b><p></p></div><div><b>Precio: " + elemento.Tipo +
      "</b><p></p></div><div><b>Tipo: " + elemento.Precio +
      "</b><p></p></div></div><div class="'card-action right-align'"><a href="'#'">Ver más</a></div></div></div>";
  		$(".lista").append(insertar);
  	});
  }

function  cargarCasas(){
	$.ajax({
  	url: "./data.json",
  	success: function(datos){
  		insertarOfertas(datos);
  	}
	});
}


/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();
