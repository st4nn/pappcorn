<?php
   $datos = json_decode(json_encode($_POST['datos']));
   
   foreach ($datos as $key => $value) 
   {
      $datos->$key = addslashes($value);
   }

   $Respuesta = array();
   $Respuesta['error'] = "";
   

   $sql = "INSERT INTO Deportes(Nombre) VALUES (
               '" . $datos->nombre . "'
            ) ON DUPLICATE KEY UPDATE Nombre = VALUES(Nombre);";

   $link->query(utf8_decode($sql));

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