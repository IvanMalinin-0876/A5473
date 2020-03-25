<?php
include("./DB_connect.php");

$author = $_GET['author'];
$sql = 'INSERT INTO `Author`(  `name`)'.
' VALUES ('.'"'.$author.'")' ;
$result = mysqli_query($dbcon, $sql);

echo "ok";

?>