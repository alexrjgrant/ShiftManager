<?php 
                                          
$userID = $_SESSION["userID"];
    
include_once $_SERVER['DOCUMENT_ROOT']."/Shift Manager/snippets/conn.php";

$userQ = $conn->prepare("SELECT * FROM USERS WHERE userID =:uID");
$userQ -> bindParam(":uID", $userID);
$userQ->execute();
$cUser = $userQ->fetch();
echo $cUser["Firstname"]." ".$cUser["Surname"]; 

?>