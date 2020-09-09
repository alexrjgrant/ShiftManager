<?php

session_start();

$d = date("Ymd");

$userID = $_SESSION["userID"];

include_once $_SERVER['DOCUMENT_ROOT']."/ShiftManager/snippets/conn.php";

$rows        = "*";
$tables      = "USERS";
$conditions  = "userID =:uID";
$orderRowRow = "";
$userQ = $conn->prepare("SELECT $rows FROM $tables WHERE $conditions"); //SELECT * FROM USERS WHERE userID =:uID
$userQ -> bindParam(":uID", $userID);
$userQ -> execute();
$cUser =  $userQ->fetch();
$search = $_GET["search"];

if($cUser)
{                          
   
    {          
        $rows        = "*, MessageID as S";
        $tables      = "MESSAGES";
        $conditions  = "(ReceiverID = $userID OR SenderID = $userID)";
        $orderRow = "Date DESC";

        if($search == 1) 
        {
            $mode = $_GET["modeDate"];
            $DS   = $_GET["dateStart"];        
            if(isset($_GET["dateEnd"])){$DE = $_GET["dateEnd"];}
            
            if($mode == "between" && (!empty($DS) || !empty($DE)))
            {
            $conditions .= " and Date >= '$DS' and Date <= '$DE'";
            }
            elseif($mode == "after" && !empty($DS))
            {
                $conditions .= " and Date >= '$DS'";
            }
            elseif($mode == "before" && !empty($DS))
            {
                $conditions .= " and Date <= '$DS'";
            }

            $uID   = $_GET["userID"];

            $conditions .= " AND SenderID = $uID";

            $ascDesc = $_GET["ascDesc"];

            $orderRow = "Date $ascDesc";
        }
//echo "SELECT $rows FROM $tables WHERE $conditions";
        $msgsQ = $conn   -> query("SELECT $rows FROM $tables WHERE $conditions ORDER BY $orderRow");
        $msgs = $msgsQ -> fetchAll(PDO::FETCH_ASSOC); 


        for($i = 0 ; $i < count($msgs); $i++)
        {
            $userID2 = $msgs[$i]["ReceiverID"];
            
            $rows        = "concat(Firstname, ' ', Surname) AS name";
            $tables      = "USERS";
            $conditions  = "userID = $userID2";
            $orderRow    = "";
    
            $userQ2 = $conn   -> query("SELECT $rows FROM $tables WHERE $conditions");
            $user2 = $userQ2  -> fetchAll(PDO::FETCH_ASSOC); 
        

            $msgs[$i]['R'] = $user2[0]['name'];

            $userID2 = $msgs[$i]["SenderID"];

            $rows        = "concat(Firstname, ' ', Surname) AS name";
            $tables      = "USERS";
            $conditions  = "userID = $userID2";
            $orderRow    = "";
    
            $userQ2 = $conn   -> query("SELECT $rows FROM $tables WHERE $conditions");
            $user2 = $userQ2  -> fetchAll(PDO::FETCH_ASSOC); 

            $msgs[$i]['S'] = $user2[0]['name'];
        }

    }
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