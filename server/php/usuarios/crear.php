<?php
   $datos = json_decode(json_encode($_POST['datos']));
   
   foreach ($datos as $key => $value) 
   {
      $datos->$key = addslashes($value);
   }

   $Respuesta = array();
   $Respuesta['error'] = "";
   

   $sql = "INSERT INTO Usuarios(id, idPais, Nombre, fechaNacimiento) VALUES  (
               " . $datos->id . ",
               '" . $datos->Pais . "',
               '" . $datos->Nombre . "',
               '" . $datos->Fecha . "'
            ) ON DUPLICATE KEY UPDATE 
               idPais = VALUES(idPais), 
               Nombre = VALUES(Nombre),
               fechaNacimiento = VALUES(fechaNacimiento);";

   $link->query(utf8_decode($sql));

   $sql "DELETE FROM Usuarios_has_Deportes WHERE idLogin = '" . $datos->id - "';";
   $link->query(utf8_decode($sql));

   if ($datos->Deportes <> "")
   {
      if ($datos->id == "null")
      {
         $datos->id = $link->insert_id;
      }
      
      $arrDeportes = explode($datos->Deportes, ",");
      $values = "";

      foreach ($arrDeportes as $key => $value) 
      {
         $values .= "(" . $datos->id . ", " . $value . "), ";
      }
      $values = substr($values, 0, -2);

      if ($values <> "")
      {
         $link->query(utf8_decode($sql));
      }
   }

   if ( $link->error <> "")
   {
      $Respuesta['Error'] .= "\n Hubo un error desconocido " . $link->error;
   } else
   {
      $nuevoId = $link->insert_id;
      $Respuesta['datos'] = $nuevoId;
   }

   echo json_encode($Respuesta);
   
?>