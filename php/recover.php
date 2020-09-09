<?php

include_once $_SERVER['DOCUMENT_ROOT']."/ShiftManager/snippets/conn.php";

    $delQ  = $conn->prepare("INSERT INTO Shifts SELECT * FROM deletedShifts");

    
    $delQ  -> execute();

?>
 