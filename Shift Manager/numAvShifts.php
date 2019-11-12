<?php

session_start();

$userID = $_SESSION["userID"];
    
$conn= new PDO("mysql:host=localhost;dbname=agrant;","alex","alex");

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

        $d = date("Ymd");
        $rows       = "*";
        $tables     = "SHIFTS";
        $conditions = "Date > $d AND available = 1";
        $orderRow   = "Date ASC, Start ASC, End ASC";
        $shiftQ = $conn->query("SELECT $rows FROM $tables WHERE $conditions ORDER BY $orderRow");
        $shifts = $shiftQ -> fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($shifts);
}





?>