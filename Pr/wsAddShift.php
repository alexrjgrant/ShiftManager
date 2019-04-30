<?php
//change GET t ppost
include 'snippets/conn.php';  

$date = $_GET["date"];
$start = $_GET["start"];
$end = $_GET["end"];
$user = $_GET["user"];
$super = $_GET["super"];

if($user == 0)
{
    $available = 1;
}
else
{
    $available = 0;
}


if((time()-(60*60*24)) < strtotime($date))
{
    if($strtotime($start) < strtotime($end))
    {
        
 $insert = $conn->prepare("INSERT INTO SHIFTS (userID, Date, Start, End, Available,Supervisor)
 
VALUES (:user, :date, :start, :end, :av, :super)");

$insert->bindParam(":user" , $user );
$insert->bindParam(":date" , $date );
$insert->bindParam(":start" , $start );
$insert->bindParam(":end" , $end );
$insert->bindParam(":av" , $available );
$insert->bindParam(":super" , $super );

$insert -> execute();
    }
    else
    {
        //bad time
    }
}
else
{
    //bad date
}
 




?>