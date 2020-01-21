<?php

    include 'snippets/conn.php'; //Connect to Database
    $s = $_POST["selectedRows"];
    $selectedRows = json_decode($s);

    $in = "?";

    for($i = 1; $i < count($selectedRows); $i++)
    {
        $in .= ",?";
    }

    $moveQ = $conn->prepare("INSERT INTO deletedShifts SELECT * FROM Shifts WHERE ShiftID IN (".$in.")");
    $delQ  = $conn->prepare("DELETE FROM Shifts WHERE ShiftID IN (".$in.")");

    for($i = 0; $i<count($selectedRows); $i++)
    {
        $moveQ ->bindParam($i + 1, $selectedRows[$i]);
        $delQ  ->bindParam($i + 1, $selectedRows[$i]);
    }

    $moveQ -> execute();
    $delQ  -> execute();

?>
 