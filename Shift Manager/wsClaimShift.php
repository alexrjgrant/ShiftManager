<?php

session_start();

$userID  = $_SESSION["userID"];
$shiftID = $_GET["shiftID"];

include 'snippets/conn.php'; //Connect to Database

$rows        = "*";
$tables      = "USERS";
$conditions  = "userID =:uID";
$orderRowRow = "";
$userQ       = $conn->prepare("SELECT $rows FROM $tables WHERE $conditions"); //SELECT * FROM USERS WHERE userID =:uID
$userQ->bindParam(":uID", $userID);
$userQ->execute();
$cUser = $userQ->fetch();

$rows        = "*";
$tables      = "SHIFTS";
$conditions  = "ShiftID =:sID";
$orderRowRow = "";
$shiftQ      = $conn->prepare("SELECT $rows FROM $tables WHERE $conditions"); //SELECT * FROM
$shiftQ->bindParam(":sID", $shiftID);
$shiftQ->execute();
$cShift = $shiftQ->fetch();

if ($cUser) {
    if ($cShift) {
        if ($cShift["Available"] == 1) {
            ////////////CHECK SAME SHIFT
            //TRY TO DATE CHECK HERE!
            
            //get date and times of clicked shift
            
            //loop currrent shifts results
            
            $rows          = "*";
            $tables        = "SHIFTS";
            $conditions    = "userID =:uID";
            $orderRowRow   = "";
            $allCurShiftsQ = $conn->prepare("SELECT $rows FROM $tables WHERE $conditions"); //SELECT * FROM SHIFTS WHERE userID =:uID
            $allCurShiftsQ->bindParam(":uID", $userID);
            $allCurShiftsQ->execute();
            
            while ($allCurShifts = $allCurShiftsQ->fetch()) {
                if ($allCurShifts["ShiftID"] != $shiftID) {
                    if ($allCurShifts["Date"] == $cShift["Date"]) {
                        // if ((shifts[ii].Start >= shifts[i].Start && shifts[ii].Start <= shifts[i].End) || 
                        //     (shifts[ii].End >= shifts[i].Start && shifts[ii].End <= shifts[i].End))
                        
                        // if($allCurShifts["Start"]
                        echo "D - \n";
                        
                        // if((strtotime($allCurShifts["Start"]) >= strtotime($cShift["Start"]) && strtotime($allCurShifts["Start"]) >= strtotime($cShift["End"])) || 
                        //    (strtotime($allCurShifts["End"]) >= strtotime($cShift["Start"]) && strtotime($allCurShifts["End"]) >= strtotime($cShift["End"])) )
                        
                        $pS = strtotime($cShift["Start"]);
                        $pE = strtotime($cShift["End"]);
                        $S  = strtotime($allCurShifts["Start"]);
                        $E  = strtotime($allCurShifts["End"]);
                        
                        // echo $cShift["Start"] . " : " . $cShift["End"]."\n ----";
                        // print "\n";
                        // echo $allCurShifts["Start"] . " : " . $allCurShifts["End"]. "\n___ ";
                        
                        
                        // if(($pS >= $S && $pS <= $E) || ($pE >= $S && $pE <= $E))
                        if (($pE <= $S) or ($pS >= $E)) {
                            $update = $conn->prepare("UPDATE SHIFTS SET userID =:uID, Available = 0 WHERE ShiftID = :sID");
                            $update->bindParam(":sID", $shiftID);
                            $update->bindParam(":uID", $userID);
                            $update->execute();
                        } else {
                            header("HTTP/1.1 400 Bad Request");
                            echo "CLASH"; ///////DEL
                        }
                        
                    }
                }
            }
        } else {
            header("HTTP/1.1 400 Bad Request");
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
} else {
    header("HTTP/1.1 401 Unauthorized");
}



?>