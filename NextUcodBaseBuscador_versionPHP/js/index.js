
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

function insertarComentarios(comentarios) {
	$.each(comentarios,function(indice,elemento){
		var insertar = "<div class='col s12 m5 l5'><div class='card-image'><img src='img/home.jpg' class='responsive-img'></div></div>";
		$(".lista").append(insertar);
	});
}

var Imagen = document.getElementsByClassName('lista');

function  cargarMasComentarios(){
	$.ajax({
		url: "./data.json",
		type:'json',
		method:'GET',
		success: function (data){
			console.log(data);
			data.forEach(function (val, i) {
				Imagen.innerHTML = Imagen.innerHTML + "<div class='col s12 m5 l5'><div class='card-image'><img src='img/home.jpg' class='responsive-img'></div></div>";
			})
		}
	});
};

$( document ).ready(function() {
	$( "#mostrarTodos" ).click(function() {
		cargarMasComentarios();
	});
});

/*var Imagen = document.getElementsByClassName('lista');

function  cargarMasComentarios(){
	$.ajax({
		url: "./data.json",
		type:'json',
		method:'GET',
		success: function (data){
			console.log(data);
		}
	});
};

$( document ).ready(function() {
	$( "#mostrarTodos" ).click(function() {
		cargarMasComentarios();
	});
});

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
     } else {
        //this.rewind(1.0, video, intervalRewind);

     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
    }, 10)
}

inicializarSlider();
playVideoOnScroll();
