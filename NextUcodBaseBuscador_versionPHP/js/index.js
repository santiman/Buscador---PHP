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
  Creación de una función para incertar en el HTML toda la informacion del archivo "data.json" mediante Ajax y JQuery
*/
$( document ).ready(function() {
	$( "#mostrarTodos" ).click(function() {
    lista();

	});
});


function lista(){
  __ajax("contenido.php", "")
  .done( function(info){
    $( ".lista" ).empty();
    var datos = JSON.parse(info);
    for (var i in datos) {
      console.log(datos[i].Precio);
      var insertar = "<div class='card horizontal ofertas'><div class='row'><div class='card z-depth-2'><div class='col s12 m5 l5'><div class='card-image'><img src='img/home.jpg' class='responsive-img'></div></div></div><div class='card z-depth-2'><div class='col s12 m7 l7'><div class='card-stacked'><div class='card-content'><div><b>Direccion: " + datos[i].Direccion +
        "</b><p></p></div><div><b value='" + datos[i].Ciudad + "'>Ciudad: " + datos[i].Ciudad + "</b><p></p></div><div><b>Telefono: " + datos[i].Telefono +
        "</b><p></p></div><div><b>Código postal: " + datos[i].Codigo_Postal + " </b><p></p></div><div><b value='" + datos[i].Tipo + "'>Tipo: " + datos[i].Tipo +
        "</b><p></p></div><div><b class='orange-text text-lighten-1' value='" + datos[i].Precio + "'>Precio: " + datos[i].Precio +
        "</b><p></p></div></div><div class='card-action right-align'><a href='#'>Ver más</a></div></div></div></div></div>";
      $(".lista").append(insertar);
    };
  });
}


/*
  Creación de funciones para el filtro de busqueda
*/
$("#submitButton").click(function(event) {

  event.preventDefault();
  $( ".lista" ).empty();

  var ciudad = $("#selectCiudad").val(),
      tipo = $("#selectTipo").val(),
      datos = {"ciudad":ciudad, "tipo":tipo};

  $.ajax({
    url: 'buscador.php',
    type: "POST",
    data: datos

  }).done(function(respuesta){
    if (respuesta.estado === "ok") {

      ciudad = respuesta.ciudad;
      tipo = respuesta.tipo;
      var slider = $("#rangoPrecio").data("ionRangeSlider");
      var from = slider.result.from;
      var to = slider.result.to;
      console.log(ciudad);
      console.log(tipo);
      __ajax("contenido.php", "")
      .done( function(info){
        var datos = JSON.parse(info);

        for (var i in datos) {
          if (datos[i].Ciudad == ciudad || ciudad == "nada") {

            console.log(ciudad);
            if (datos[i].Tipo == tipo || tipo == "nada") {

              console.log(tipo);
              var lugarPrecio = datos[i].Precio;
               lugarPrecio = lugarPrecio.toString().split("$");
               lugarPrecio = lugarPrecio.join('');
               lugarPrecio = lugarPrecio.toString().split(",");
              var elPrecio = parseInt(lugarPrecio.join(''));

              if (elPrecio >= from && elPrecio <= to) {
                  console.log("hola 1");
                  var busqueda = "<div class='card horizontal ofertas'><div class='row'><div class='card z-depth-2'><div class='col s12 m5 l5'><div class='card-image'><img src='img/home.jpg' class='responsive-img'></div></div></div><div class='card z-depth-2'><div class='col s12 m7 l7'><div class='card-stacked'><div class='card-content'><div><b>Direccion: " + datos[i].Direccion +
                    "</b><p></p></div><div><b value='" + datos[i].Ciudad + "'>Ciudad: " + datos[i].Ciudad + "</b><p></p></div><div><b>Telefono: " + datos[i].Telefono +
                    "</b><p></p></div><div><b>Código postal: " + datos[i].Codigo_Postal + " </b><p></p></div><div><b value='" + datos[i].Tipo + "'>Tipo: " + datos[i].Tipo +
                    "</b><p></p></div><div><b class='orange-text text-lighten-1' value='" + datos[i].Precio + "'>Precio: " + datos[i].Precio +
                    "</b><p></p></div></div><div class='card-action right-align'><a href='#'>Ver más</a></div></div></div></div></div>";
                  $(".lista").append(busqueda);
                  console.log("hola 2");
                };
              };
            };

        };
      });
    }
  });
});


/*
  Funcion para los selects en el HTML
*/
$(function(){
  __ajax("selectCiudades.php", "")
  .done( function(info){
    var datos = info;
    $("#selectCiudad").append(info);
    $('select').material_select();
  })
  __ajax("selectTipos.php", "")
  .done( function(info){
    var datos = info;
    $("#selectTipo").append(info);
    $('select').material_select();
  })
});


/*
  Funcion de extraccion de datos en un archivo PHP por medio de Ajax
*/
function __ajax(url, data){
  var ajax = $.ajax({
    "method": "POST",
    "url": url,
    "data": data
  })
  return ajax;
}



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

inicializarSlider();
