<?php

session_start();

$userID = $_SESSION["userID"];
$shiftID = $_POST["shiftID"]; 
$mode = $_POST["mode"];

include_once $_SERVER['DOCUMENT_ROOT']."/Shift Manager/snippets/conn.php";


$rows        = "*";
$tables      = "USERS";
$conditions  = "userID =:uID";
$orderRowRow = "";
$userQ = $conn->prepare("SELECT $rows FROM $tables WHERE $conditions"); //SELECT * FROM USERS WHERE userID =:uID
$userQ -> bindParam(":uID", $userID);
$userQ -> execute();
$cUser =  $userQ->fetch();

$rows        = "*";
$tables      = "SHIFTS";
$conditions  = "shiftID =:sID";
$orderRowRow = "";
$shiftQ = $conn->prepare("SELECT $rows FROM $tables WHERE $conditions"); //SELECT * FROM
$shiftQ -> bindParam(":sID", $shiftID);
$shiftQ -> execute();
$cShift =  $shiftQ->fetch();

if($cUser)
{
    if($cShift)
    {
        if($cShift["Available"] == 0)
        {
            if($mode == "swap"   &&   $cShift["userID"] == $cUser["userID"])
            {
                $update = $conn->prepare("UPDATE SHIFTS SET Available = 1 WHERE ShiftID = :sID");
                $update -> bindParam(":sID", $shiftID);
                $update->execute();
            }
            else
            {
                header("HTTP/1.1 400 Bad Request");
            }
        }
        elseif($cShift["Available"] == 1)
        {
            if($mode == "claim")
            {
                $update = $conn->prepare("UPDATE SHIFTS SET userID =:uID, Available = 0 WHERE ShiftID = :sID");
                $update -> bindParam(":sID", $shiftID);
                $update -> bindParam(":uID", $userID);   
                $update->execute();
                
            }
            else
            {
                header("HTTP/1.1 400 Bad Request");
            }    
        }
        else
        {
            header("HTTP/1.1 500 There was an error on the server and the request could not be completed.");
        }
    }
    else
    {
        header("HTTP/1.1 400 Bad Request");
    }
}
else
{
    header("HTTP/1.1 401 Unauthorized");
}



?>