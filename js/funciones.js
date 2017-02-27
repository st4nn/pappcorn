var Usuario = null;
var Permisos = null;

$(document).ready(function() {
  functions();
});
function functions()
{
  Usuario = JSON.parse(localStorage.getItem('pappcorn_test'));

  funcion_Inicio();
  if (Usuario == null || Usuario === undefined)
  {
    //cerrarSesion();
  } else
  {
    $(document).delegate('.lnkCerrarSesion', 'click', function(event) 
    {
      event.preventDefault();
      cerrarSesion();
    });
  }
}

$.fn.generarDatosEnvio = function(restricciones, callback)
{
  if (callback === undefined)
    {callback = function(){};}

    var obj = $(this).find(".guardar");
  var datos = {};

  $.each(obj, function(index, val) 
  {
    if ($(val).attr("id") != undefined)
    {
      if ($(val).attr("type") == 'checkbox')
      {
          datos[$(val).attr("id").replace(restricciones, "")] = $(val).is(':checked');
      } else
      {
        datos[$(val).attr("id").replace(restricciones, "")] = $(val).val();
      }
    }
  });
  datos = JSON.stringify(datos);  
  datos = JSON.parse(datos);

  callback(datos);
}

function obtenerFecha()
{
  var f = new Date();
    return f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 2);
}

function obtenerPrefijo()
{
  var f = new Date();
  return f.getFullYear() + CompletarConCero(f.getMonth() +1, 2) + CompletarConCero(f.getDate(), 2) + CompletarConCero(f.getHours(), 2) + CompletarConCero(f.getMinutes(), 2) + CompletarConCero(f.getSeconds(), 2);
}
function CompletarConCero(n, length)
{
   n = n.toString();
   while(n.length < length) n = "0" + n;
   return n;
}
function cerrarSesion()
{
  delete localStorage.pappcorn_test;
  window.location.replace("index.html");
}

var crearDeporte = function(nomDeporte, callback)
{
  if (callback === undefined)
  {     callback = function(){};    }

  nomDeporte = nomDeporte || "";
  if (nomDeporte == "")
  {
    return false;
  } else
  {
    $.post('server/php/deportes.php', {param: 'crear', datos : {nombre : nomDeporte}}, function(data, textStatus, xhr) 
    {
      if (data.error != "")
      {
        swal("Error!", data.error, "error");
      } else
      {
        callback(data.id);
      }
    }, 'json');
  }
}

var crearUsuario = function(datos, callback)
{
  if (callback === undefined)
  {     callback = function(){};    }

  datos = datos || {};
  if (datos == {})
  {
    return false;
  } else
  {
    $.post('server/php/usuarios.php', {param: 'crear', datos : datos}, function(data, textStatus, xhr) 
    {
      if (data.error != "")
      {
        swal("Error!", data.error, "error");
      } else
      {
        callback(data.datos);
      }
    }, 'json');
  }
}

var borrarUsuario = function(idUsuario, callback)
{
  if (callback === undefined)
  {     callback = function(){};    }

  idUsuario = idUsuario || "";
  if (idUsuario == "")
  {
    return false;
  } else
  {
    $.post('server/php/usuarios.php', {param: 'borrar', datos : {id : idUsuario}}, function(data, textStatus, xhr) 
    {
      if (data.error != "")
      {
        swal("Error!", data.error, "error");
      } else
      {
        callback(data.id);
      }
    }, 'json');
  }
}

var cargarUsuarios = function(callback)
{
  if (callback === undefined)
  {     callback = function(){};    }

    $.post('server/php/usuarios.php', {param: 'cargar', datos : {}}, function(data, textStatus, xhr) 
    {
      if (data.error != undefined)
      {
        swal("Error!", data.error, "error");
      } else
      {
        if (data != 0)
        {
          callback(data);
        }
      }
    }, 'json');
  
}