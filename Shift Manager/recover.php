<?php

    include 'snippets/conn.php'; //Connect to Database

    $delQ  = $conn->prepare("INSERT INTO Shifts SELECT * FROM deletedShifts");

    
    $delQ  -> execute();

?>
 