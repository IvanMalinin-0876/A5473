<?php

$auNum;$auName;$sql;
$bn_name = $_GET['name'];
$pageCount = $_GET['pageCount'];
$author = $_GET['author'];

include("./DB_connect.php");



$sql = "SELECT * FROM `Author` where  `name` = '$author' ";
$result = mysqli_query($dbcon, $sql);	
while ($row = mysqli_fetch_assoc($result)) {
$auNum  = htmlentities($row['authorId']);
$auName  = htmlentities($row['name']);    


$sql = 'INSERT INTO `Book`( `name`, `pageCount`, `authorId`, `author`)'.
' VALUES ('.
'"'.$bn_name.'",'.
'"'.$pageCount.'",'.
'"'.$auNum.'",'.
'"'.$auName.'")' ;

}





$result = mysqli_query($dbcon, $sql);


echo "OK";

?>