<?php


session_start();

$d = date("Ymd");

$search = $_GET["search"];

$userID = $_SESSION["userID"];
$all =    $_GET["all"];
$specUser = $_GET["SU"];
    
include 'snippets/conn.php'; //Connect to Database

$userQ = $conn->prepare("SELECT * FROM USERS WHERE userID =:uID");
$userQ -> bindParam(":uID", $userID);

$userQ->execute();
$cUser = $userQ->fetch();

if($cUser)
{
    $admin = $cUser["Admin"];
    $super = $cUser["Supervisor"];
    
    if($specUser == 1)
    {
        $shiftQ = $conn->query("SELECT * FROM SHIFTS WHERE Date > $d AND userID = $userID ORDER BY Date ASC, Start ASC, End ASC");
        $shifts = $shiftQ -> fetchAll(PDO::FETCH_ASSOC);
    }
    else
    {
        if($all == 1 and $admin == 1)
        {
            if($search == 0)
            {
            $shiftQ = $conn->query("SELECT SHIFTS.ShiftID, SHIFTS.userID, SHIFTS.Date,SHIFTS.Start,SHIFTS.End,SHIFTS.Available,SHIFTS.Supervisor,USERS.Firstname,USERS.Surname FROM SHIFTS INNER JOIN USERS ON SHIFTS.userID = USERS.userID WHERE Date > $d ORDER BY Date ASC, Start ASC, End ASC");
            
            $shifts = $shiftQ -> fetchAll(PDO::FETCH_ASSOC);
            }
            else if($search == 1)
            {
                
$date = $_GET["date"];
$start = $_GET["start"];
$end = $_GET["end"];
$av = $_GET["av"];
$sup = $_GET["sup"];
$uID = $_GET["uID"];

$where = "WHERE Date > $d";

if(!empty($date)){
$where .= " and Date = '$date'";
}

if(!empty($start) && !empty($end)){
$where .= " and Start >= '$start' AND End <= '$end'";
}
if(!empty($av)){
$where .= " and SHIFTS.Available = $av";
}
if(!empty($sup)){
$where .= " and SHIFTS.Supervisor = '$sup'";
}
if(!empty($uID))
{
$where .= " and SHIFTS.userID = $uID";
}
            

 $shiftQ = $conn->query("SELECT SHIFTS.ShiftID, SHIFTS.userID, SHIFTS.Date,SHIFTS.Start,SHIFTS.End,SHIFTS.Available,SHIFTS.Supervisor,USERS.Firstname,USERS.Surname FROM SHIFTS INNER JOIN USERS ON SHIFTS.userID = USERS.userID $where ORDER BY Date ASC, Start ASC, End ASC");

$shifts = $shiftQ -> fetchAll(PDO::FETCH_ASSOC);
                
            }
            else
            {
                //errr
            }
            
        }
        else if($all == 0)
        {
            $shiftQ = $conn->query("SELECT SHIFTS.ShiftID, SHIFTS.userID, SHIFTS.Date,SHIFTS.Start,SHIFTS.End,SHIFTS.Available,SHIFTS.Supervisor,USERS.Firstname,USERS.Surname FROM SHIFTS INNER JOIN USERS ON SHIFTS.userID = USERS.userID WHERE Date > $d AND SHIFTS.Available = 1 AND SHIFTS.Supervisor <= '$super' ORDER BY Date ASC, Start ASC, End ASC");

            $shifts = $shiftQ -> fetchAll(PDO::FETCH_ASSOC);
        }
        else
        {
            header("HTTP/1.1 400 Bad Request");
        }
    }

    if($shifts)
    {
        echo json_encode($shifts);
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











?>