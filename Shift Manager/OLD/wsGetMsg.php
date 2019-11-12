<?php

session_start();

$userID = $_SESSION["userID"];

    
include 'snippets/conn.php'; //Connect to Database

$userQ = $conn->prepare("SELECT * FROM USERS WHERE userID =:uID");
$userQ -> bindParam(":uID", $userID);

$userQ->execute();
$cUser = $userQ->fetch();

if($cUser)
{
    $msgsQ = $conn->query("SELECT * FROM MESSAGES WHERE ReceiverID =$userID");

    $msgs = $msgsQ -> fetchAll(PDO::FETCH_ASSOC);
    
   

    if($msgs)
    {
        
        echo json_encode($msgs);
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