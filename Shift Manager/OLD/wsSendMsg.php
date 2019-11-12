<?php
session_start();

include 'snippets/conn.php';  

$date = date("Y-m-d H:i:s");
$user = $_SESSION["userID"];
$re = $_POST["re"];
$msg = $_POST["msg"];
        
 $insert = $conn->query("INSERT INTO MESSAGES (SenderID, ReceiverID,Message, R)
 
VALUES ($user,$re,'$msg',0)");

print_r($conn->errorInfo());
header("Location: sendMessage.php?r=Message Sent"); 

?>