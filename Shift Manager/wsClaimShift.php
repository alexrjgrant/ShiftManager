<?php

session_start();

//Input
$userID  = $_SESSION["userID"];
$shiftID = $_POST["shiftID"];

include 'snippets/conn.php'; //Connect to Database

//Select Statement
$rows        = "*";
$tables      = "USERS";
$conditions  = "userID =:uID";
$orderRowRow = "";
$userQ       = $conn->prepare("SELECT $rows FROM $tables WHERE $conditions"); //SELECT * FROM USERS WHERE userID =:uID
$userQ->bindParam(":uID", $userID);
$userQ->execute();
$cUser = $userQ->fetch();

//Select Statement
$rows        = "*";
$tables      = "SHIFTS";
$conditions  = "ShiftID =:sID";
$orderRowRow = "";
$shiftQ      = $conn->prepare("SELECT $rows FROM $tables WHERE $conditions"); //SELECT * FROM
$shiftQ->bindParam(":sID", $shiftID);
$shiftQ->execute();
$cShift = $shiftQ->fetch();

if ($cUser) //If user logged in
{ 
    if ($cShift) //if shift existed
    {
        if ($cShift["Available"] == 1) //if shift is available
        {
            $update = true;
                        
            //Select statemtent
            $rows          = "*";
            $tables        = "SHIFTS";
            $conditions    = "userID =:uID";
            $orderRowRow   = "";
            $allCurShiftsQ = $conn->prepare("SELECT $rows FROM $tables WHERE $conditions"); //SELECT * FROM SHIFTS WHERE userID =:uID
            $allCurShiftsQ->bindParam(":uID", $userID);
            $allCurShiftsQ->execute();
            
            //loop users currrent shifts
            while ($allCurShifts = $allCurShiftsQ->fetch()) {
                
                //if not comparing same shifts
                if ($allCurShifts["ShiftID"] != $shiftID) 
                {
                    //if same date
                    if ($allCurShifts["Date"] == $cShift["Date"]) 
                    {
                        //convert to time format
                        $pS = strtotime($cShift["Start"]);
                        $pE = strtotime($cShift["End"]);
                        $S  = strtotime($allCurShifts["Start"]);
                        $E  = strtotime($allCurShifts["End"]);

                        //if times do not overlap
                        if (($pE <= $S) or ($pS >= $E)) 
                        {
                            //Alter database
                            $update = $conn->prepare("UPDATE SHIFTS SET userID =:uID, Available = 0 WHERE ShiftID = :sID");
                            $update->bindParam(":sID", $shiftID);
                            $update->bindParam(":uID", $userID);
                            $update->execute();
                            echo "pass";
                        } 
                        else
                        {
                                //error time clash
                                $update = false;
                                header("HTTP/1.1 400 Bad Request");
                        }
                            
                    }
                }
            }

            if($update)
            {
                //Alter database
                $update = $conn->prepare("UPDATE SHIFTS SET userID =:uID, Available = 0 WHERE ShiftID = :sID");
                $update->bindParam(":sID", $shiftID);
                $update->bindParam(":uID", $userID);
                $update->execute();
                echo "pass";
            }



        } 
        else 
        {
            $update = false;
            header("HTTP/1.1 400 Bad Request");
        }
    } 
    else 
    {
        $update = false;
        header("HTTP/1.1 400 Bad Request");
    }
} 
else 
{
    $update = false;
    header("HTTP/1.1 401 Unauthorized");
}

?>