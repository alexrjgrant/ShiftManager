<?php

session_start();

$d = date("Ymd");

$search = $_GET["search"];

$userID = $_SESSION["userID"];
    
include_once $_SERVER['DOCUMENT_ROOT']."/ShiftManager/snippets/conn.php";

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
    // $admin = $cUser["Admin"];
    // $super = $cUser["Supervisor"];
    
    if($search == 0) 
    {        
        $rows       = "SHIFTS.ShiftID, SHIFTS.userID, SHIFTS.Date,SHIFTS.Start,SHIFTS.End,SHIFTS.Available,SHIFTS.Supervisor,USERS.Firstname,USERS.Surname";
        $tables     = "SHIFTS INNER JOIN USERS ON SHIFTS.userID = USERS.userID";
        $conditions = "Date > $d AND available = 1";
        $orderRow   = "Date ASC, Start ASC, End ASC";
        $shiftQ = $conn->query("SELECT $rows FROM $tables WHERE $conditions ORDER BY $orderRow");
    }
    else if($search == 1)
    {          
        $rows        = "SHIFTS.ShiftID, SHIFTS.userID, SHIFTS.Date,SHIFTS.Start,SHIFTS.End,SHIFTS.Available,SHIFTS.Supervisor,USERS.Firstname,USERS.Surname";
        $tables      = "SHIFTS INNER JOIN USERS ON SHIFTS.userID = USERS.userID";
        $conditions  = "Date > $d AND available = 1";
        $orderRow    = "";

        $mode = $_GET["modeDate"];
        $DS   = $_GET["dateStart"];        
        if(isset($_GET["dateEnd"])){$DE = $_GET["dateEnd"];}
        
        if($mode == "between" && (!empty($DS) || !empty($DE)))
        {
           $conditions .= " and Date >= '$DS' and Date <= '$DE'";
        }
        elseif($mode == "after" && !empty($DS))
        {
            $conditions .= " and Date >= '$DS'";
        }
        elseif($mode == "before" && !empty($DS))
        {
            $conditions .= " and Date <= '$DS'";
        }
        
        $mode2 = $_GET["modeStart"];
        $SS = $_GET["startStart"];
        if(isset($_GET["startEnd"])){$SE = $_GET["startEnd"];}
        
        if($mode2 == "between" && (!empty($SS) || !empty($SE)))
        {
           $conditions .= " and Start >= '$SS' and Start <= '$SE'";
        }
        elseif($mode2 == "after" && !empty($SS))
        {
            $conditions .= " and Start >= '$SS'";
        }
        elseif($mode2 == "before" && !empty($SS))
        {
            $conditions .= " and Start <= '$SS'";
        }
     
        $mode3 = $_GET["modeEnd"];
        $ES = $_GET["endStart"];
        if(isset($_GET["endEnd"])){$EE = $_GET["endEnd"];}
        
        if($mode3 == "between" && (!empty($ES) && !empty($EE)))
        {
           $conditions .= "and End >= '$ES' and End <= '$EE'";
        }
        elseif($mode3 == "after" && !empty($ES))
        {
            $conditions .= " and End >= '$ES'";
        }
        elseif($mode3 == "before" && !empty($ES))
        {
            $conditions .= " and End <= '$ES'";
        }
        
        $orderRowBy = $_GET["orderBy"];
        $ascDesc = $_GET["ascDesc"];
        
        if($orderRowBy == "Date")
        {
            $orderRow .= "Date $ascDesc, Start $ascDesc, End $ascDesc";
        }
        elseif($orderRowBy == "Start")
        {
            $orderRow .= "Start $ascDesc,Date $ascDesc,  End $ascDesc";
        }
        elseif($orderRowBy == "End")
        {
            $orderRow .= " End $ascDesc, Date $ascDesc, Start $ascDesc";
        }
        
        $shiftQ = $conn -> query("SELECT $rows FROM $tables WHERE $conditions ORDER BY $orderRow");
    }

    $avShifts = $shiftQ -> fetchAll(PDO::FETCH_ASSOC);

    $rows       = "SHIFTS.ShiftID, SHIFTS.userID, SHIFTS.Date,SHIFTS.Start,SHIFTS.End,SHIFTS.Available,SHIFTS.Supervisor,USERS.Firstname,USERS.Surname";
    $tables     = "SHIFTS INNER JOIN USERS ON SHIFTS.userID = USERS.userID";
    $conditions = "SHIFTS.userID = $userID";
    $orderRow   = "Date ASC, Start ASC, End ASC";
    $shiftQ = $conn->query("SELECT $rows FROM $tables WHERE $conditions ORDER BY $orderRow");

    $currentShifts = $shiftQ -> fetchAll(PDO::FETCH_ASSOC);

    foreach ($currentShifts as $key => $cValue) 
    {
        $cDate    = strtotime($cValue["Date"]);
        $cShiftID = $cValue["ShiftID"];
        $cStart   = strtotime($cValue["Start"]);
        $cEnd     = strtotime($cValue["End"]);
    
        foreach ($avShifts as $key => $aValue) 
        {
            $aDate    = strtotime($aValue["Date"]);
            $aShiftID = $aValue["ShiftID"];
            $aStart   = strtotime($aValue["Start"]);
            $aEnd     = strtotime($aValue["End"]);
    
            if($cShiftID != $aShiftID)
            {
                if($aDate == $cDate)
                {
                    if (($cStart <= $aEnd) && ($cEnd >= $aStart))
                    {
                       // echo  $cValue["ShiftID"]. " - " .$aValue["ShiftID"]."<br>";
                        
                        unset($avShifts[$key]);
                    }
                }
            }
        }
    } 





    if($avShifts)
    {
        echo json_encode(array_values($avShifts));
    }
    else
    {
        header("HTTP/1.1 404 Not Found");
    }
}
else
{
    header("HTTP/1.1 401 Unauthorized");
}