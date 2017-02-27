<?php
   $sql = "SELECT
               Usuarios.*,
               GROUP_CONCAT(DISTINCT Deportes.id  SEPARATOR ',') AS idDeportes,
               GROUP_CONCAT(DISTINCT Deportes.Nombre  SEPARATOR ', ') AS Deportes,
               (DATEDIFF( NOW( ) , fechaNacimiento ) /360) AS Edad,
               Paises.Nombre AS Pais
            FROM 
               Usuarios
                LEFT JOIN Usuarios_has_Deportes ON Usuarios_has_Deportes.idLogin = Usuarios.id
                LEFT JOIN Deportes ON Deportes.id = Usuarios_has_Deportes.idDeporte
                LEFT JOIN Paises ON Paises.id = Usuarios.idPais
            GROUP BY
               Usuarios.id;";

   $result = $link->query($sql);

   $idx = 0;
   if ( $result->num_rows > 0)
   {
      $Resultado = array();
      while ($row = mysqli_fetch_assoc($result))
      {
         $Resultado[$idx] = array();
         foreach ($row as $key => $value) 
         {
            $Resultado[$idx][$key] = utf8_encode($value);
         }
         $idx++;
      }
         mysqli_free_result($result);  
         echo json_encode($Resultado);
   } else
   {
      echo 0;
   }
?>