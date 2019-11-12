<?php

include 'snippets/conn.php';  

$date = $_POST["date"];
$start = $_POST["start"];
$end = $_POST["end"];
$user = $_POST["user"];
$super = $_POST["super"];
$mode = $_POST["mode"];
$sID = $_POST["ID"];


if($user == 0)
{
    $available = 1;
}
else
{
    $available = 0;
}


    $insert = $conn->prepare("INSERT INTO SHIFTS (userID, Date, Start, End, Available,Supervisor)
 
    VALUES (:user, :date, :start, :end, :av, :super)");

    $insert->bindParam(":user" , $user );
    $insert->bindParam(":date" , $date );
    $insert->bindParam(":start" , $start );
    $insert->bindParam(":end" , $end );
    $insert->bindParam(":av" , $available );
    $insert->bindParam(":super" , $super );

    $insert -> execute();

    echo mysqli_error($conn);

    header("Location: addShift.php?r=SHIFT ADDED");
    
}
else
{
     header("Location: addShift.php?r=Bad Input Try Again"); 
}





?>