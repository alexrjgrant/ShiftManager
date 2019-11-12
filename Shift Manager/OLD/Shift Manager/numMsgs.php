<?php

session_start();

$userID = $_SESSION["userID"];
    
include 'snippets/conn.php'; //Connect to Database

$rows        = "*";
$tables      = "USERS";
$conditions  = "userID =:uID";
$orderRowRow = "";
$userQ = $conn->prepare("SELECT $rows FROM $tables WHERE $conditions"); //SELECT * FROM USERS WHERE userID =:uID
$userQ -> bindParam(":uID", $userID);
$userQ -> execute();
$cUser =  $userQ->fetch();

if($cUser)
{
        $uID = $cUser["userID"];

        $rows       = "*";
        $tables     = "MESSAGES";
        $conditions = "ReceiverID = $uID";
        $shiftQ = $conn->query("SELECT $rows FROM $tables WHERE $conditions");
        $shifts = $shiftQ -> fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($shifts);
}

?>