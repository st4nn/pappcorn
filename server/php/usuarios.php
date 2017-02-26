<?php
   include("../conectar.php"); 

   date_default_timezone_set('America/Bogota');

   $link = Conectar();

   if (array_key_exists('param', $_POST))
   {
      $parametro = addslashes($_POST['param']);
      if (file_exists('usuarios/'. $parametro .'.php'))
      {
         include('usuarios/'. $parametro .'.php');
      }
   } else
   {
      $respuesta = array();
      $respuesta['error'] = utf8_encode("Los parámetros enviados no son válidos");
      echo json_encode($respuesta);
   }      
?>