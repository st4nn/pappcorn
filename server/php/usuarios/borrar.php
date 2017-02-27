<?php
   $datos = json_decode(json_encode($_POST['datos']));
   
   foreach ($datos as $key => $value) 
   {
      if (!is_array($value))
      {
         $datos->$key = addslashes($value);
      }
   }

   $Respuesta = array();
   $Respuesta['error'] = "";
   

   $sql = "DELETE FROM  Usuarios WHERE id = '" . $datos->id . "';";
   $link->query(utf8_decode($sql));

   if ( $link->error <> "")
   {
      $Respuesta['Error'] .= "\n Hubo un error desconocido " . $link->error;
   } else
   {
      $nuevoId = $link->insert_id;
      $Respuesta['datos'] = $nuevoId;
   }

   $sql = "DELETE FROM Usuarios_has_Deportes WHERE idLogin = '" . $datos->id - "';";
   $link->query(utf8_decode($sql));

   echo json_encode($Respuesta);
   
?>