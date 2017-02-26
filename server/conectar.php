<?php 
function Conectar() 
{ 

   $link = new mysqli("localhost", "root", "holamundo", "pappcorn_prueba");
   if ($link->connect_errno) 
   {
      echo "Error: (" . $link->connect_errno . ") " . $link->connect_error;
      exit(); 
   }

   return $link; 
} 

?>
