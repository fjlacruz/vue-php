<?php @session_start();
$con = new mysqli('localhost','root','','snipets');
if ($con->connect_errno) {
    die("La conexion no pudo establecerse");
}else{
   // echo 'conectado';
}
 ?>