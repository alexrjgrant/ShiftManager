<?php session_start(); ?>



<html lang="en"><!--Index Page--> 

<?php if(isset($_SESSION["userID"])) { ?>
    
<head>  
    
    <meta charset="utf-8"> <!--Set Charset-->
    
    <script type='text/javascript' src='js/topBar.js'></script>

    <link rel="stylesheet" type="text/css" href="css/navi.css"><!--Includes CSS File-->

    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico"> <!--Set Favicon-->

    <title>Staff Manager</title> <!--Page Title-->
 
</head>
     
    <body onload="initTopBar()"><!--.-->
 
        <div id = "wrapper"><!--Body Wrapper-->
        
            <?php include 'snippets/header.html'; ?>

            <main> 
                
                <?php include 'snippets/topBar.html'; ?>
                    
                    
                <div id = "mh">
                    <h4 id = "main_heading">Select A Function</h4> <!--Main heading-->
                </div>

                <br/>
                
        
                
                
                
                

                <div>

                    <table>
                        <tr>
                            <td><form action="availableShifts.php"><input class = "bigBtn" type="submit" value="Avalible Shifts"></form></td>
                            
                            <td><form action="acceptedShifts.php"><input class = "bigBtn" type="submit" value="Accepted Shifts"></form></td>
                        </tr>

                        <tr>
                            <td><form action="viewMessages.php"><input class = "bigBtn" type="submit" value="View Messages"></form></td>
                            
                            <td><form action="sendMessage.php"><input class = "bigBtn" type="submit" value="Send A Message"></form></td>                            
                        </tr>

                        <?php if($_SESSION["isadmin"] == 1){ ?>
                        <tr>
                            <td><form action="addShift.php"><input class = "bigBtn" type="submit" value="Add Shifts"></form></td>
                            
                            <td><form action="allShifts.php"><input class = "bigBtn" type="submit" value="Manage Shifts"></form></td>              
                        </tr>
                        
                        <tr>
                            <td><form action=".php"><input class = "bigBtn" type="submit" value="Manage Users"></form></td>
                            
                            <td><form action=".php"><input class = "bigBtn" type="submit" value="Add User"></form></td>              
                        </tr>
                        <?php } ?>
                        
                        
                    </table>
                </div>
            </main>  
        </div><!--Body Wrapper-->
    </body><!--body-->
    
    <?php } else {echo"Please Log In";} ?>

    <?php $session_value=$_SESSION['userID']; ?>
<script type="text/javascript">
    var curUserID = '<?php echo $session_value;?>';
</script>
    
    
</html><!--Index Page-->
