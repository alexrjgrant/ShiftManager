<?php

$shiftID = $_POST["shiftID"];

$shiftQ = $conn->prepare("DELETE FROM SHIFTS WHERE ShiftID = :sID");
$shiftQ -> bindParam(":sID", $shiftID);
$shiftQ -> execute();

?>