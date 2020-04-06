<?php

include_once $_SERVER['DOCUMENT_ROOT']."/Shift Manager/snippets/conn.php";

    $delQ  = $conn->prepare("INSERT INTO Shifts SELECT * FROM deletedShifts");

    
    $delQ  -> execute();

?>
 