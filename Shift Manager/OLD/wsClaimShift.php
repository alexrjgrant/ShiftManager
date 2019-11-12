<?php

session_start();

$userID = $_SESSION["userID"];
$shiftID = $_POST["shiftID"]; 
$mode = $_POST["mode"];
    
include 'snippets/conn.php'; //Connect to Database

$userQ = $conn->prepare("SELECT * FROM USERS WHERE userID =:uID");
$userQ -> bindParam(":uID", $userID);

$userQ->execute();
$cUser = $userQ->fetch();

$shiftQ = $conn->prepare("SELECT * FROM SHIFTS WHERE shiftID =:sID");
$shiftQ -> bindParam(":sID", $shiftID);

$shiftQ->execute();
$cShift = $shiftQ->fetch();

if($cUser)
{
    if($cShift)
    {
        if($mode == "accept"  && $cShift["Available"] == 1)
        {
        $update = $conn->prepare("UPDATE SHIFTS SET userID =:uID, Available = 0 WHERE ShiftID = :sID");
        $update -> bindParam(":sID", $shiftID);
        $update -> bindParam(":uID", $userID);
 
        $update->execute();
        }
        else if ($mode == "swap")
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