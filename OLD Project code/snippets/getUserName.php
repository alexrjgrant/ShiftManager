<?php 
                                          
$userID = $_SESSION["userID"];
    
include 'snippets/conn.php'; //Connect to Database

$userQ = $conn->prepare("SELECT * FROM USERS WHERE userID =:uID");
$userQ -> bindParam(":uID", $userID);
$userQ->execute();
$cUser = $userQ->fetch();
                                          
                                          echo $cUser["Firstname"]." ".$cUser["Surname"]; ?>