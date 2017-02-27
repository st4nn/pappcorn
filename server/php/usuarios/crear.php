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

   if ($datos->Deportes <> "")
   {
      if ($datos->id == "null")
      {
         $datos->id = $nuevoId;
      }

      $values = "";

      foreach ($datos->Deportes as $key => $value) 
      {
         $values .= "(" . $datos->id . ", " . $value . "), ";
      }
      $values = substr($values, 0, -2);

      
      if ($values <> "")
      {
         $sql = "INSERT INTO Usuarios_has_Deportes (idLogin, idDeporte) VALUES " . $values . ";";
         $link->query(utf8_decode($sql));
      }
   }


   echo json_encode($Respuesta);
   
?>