<?php

session_start();

$un = htmlentities($_POST["un"]);
$pw = htmlentities($_POST["pw"]);

include_once $_SERVER['DOCUMENT_ROOT']."/ShiftManager/snippets/conn.php";

$login = $conn -> prepare("SELECT * FROM USERS WHERE Username=:username AND Password=:password");

$login -> bindParam(":username", $un);
$login -> bindParam(":password", $pw);
$login -> execute();

$row = $login -> fetch();

if(!$row) //If not results Returned
{
	echo "Incorrect username or password";
}
else //If match found
{	
	$_SESSION["userID"] = $row["userID"];
	$_SESSION["isadmin" ] = $row["Admin"];
	
	header("Location: /ShiftManager/navigation.php");

	
}

?>
