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

var calcularEdad = function(fecha)
{
  if (fecha != "")
  {
    // Si la fecha es correcta, calculamos la edad
    var values=fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];

    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth()+1;
    var ahora_dia = fecha_hoy.getDate();

    // realizamos el calculo
    var edad = (ahora_ano + 1900) - ano;
    if ( ahora_mes < mes )
    {
        edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia))
    {
        edad--;
    }
    if (edad > 1900)
    {
        edad -= 1900;
    }

    // calculamos los meses
    var meses=0;
    if(ahora_mes>mes)
        meses=ahora_mes-mes;
    if(ahora_mes<mes)
        meses=12-(mes-ahora_mes);
    if(ahora_mes==mes && dia>ahora_dia)
        meses=11;

    // calculamos los dias
    var dias=0;
    if(ahora_dia>dia)
        dias=ahora_dia-dia;
    if(ahora_dia<dia)
    {
        ultimoDiaMes=new Date(ahora_ano, ahora_mes, 0);
        dias=ultimoDiaMes.getDate()-(dia-ahora_dia);
    }
      
      return {anios : edad, meses : meses, dias : dias};
  } else
  {
    return {anios : 0, meses : 0, dias : 0};
  }
}