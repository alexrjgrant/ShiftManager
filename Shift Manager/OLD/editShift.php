<?php session_start();  ?>
<html lang="en"><!--Index Page--> 

 <?php include 'snippets/head.html';
    
    $date = $_GET["date"];
$start = $_GET["start"];
$end = $_GET["end"];
$sup = $_GET["sup"];
    if($sup = "Yes"){$sup = 1;}
    if($sup = "No"){$sup = 0;}
    
$uID = $_GET["uID"];
    $u = $_GET["u"];
    $sID = $_GET["sID"];
    ?>

    
    <body><!--.-->
 
        <div id = "wrapper"><!--Body Wrapper-->

            
             <?php include 'snippets/header.html'; ?>
  
           
            <main> 
                 <?php if(isset($_SESSION["userID"])) 
        {
            if($_SESSION["isadmin"] == 1)
            {  ?> 
                
                <div id = "mh">
                    <h4 id = "main_heading">Edit Shift</h4> <!--Main heading-->
                </div>
                
                <br/>
                   <?php  $r = $_GET["r"]; if($r != ""){echo $r;}  ?>          
                <div id = "frm">
                    
                    <table>
                        <form action="wsAddShift.php" method="post">
                            <tr>
                                <td><p>Date</p></td>
                                <td><input name = "date" type="date" <?php echo "value = $date"; ?> ></td>
                            </tr> 
                            <tr>
                                <td><p>Start</p></td>
                                <td><input name = "start" type="time" <?php echo "value = $start"; ?> ></td>
                            </tr>
                            <tr>
                                <td><p>End</p></td>
                                <td><input name = "end" type="time" <?php echo "value = $end"; ?> ></td>
                            </tr>
                            <tr>  
                                <td><p>User</p></td>
                                <td>
                                <select  name = "user"  <?php echo "value = $uID"; ?> >
                                    <option value="0">N/a</option>
                                    <?php

                                    include 'snippets/conn.php'; //Connect to Database
                                    $userQ = $conn->prepare("SELECT * FROM USERS");
                                    $userQ->execute();

                                    while( $users = $userQ ->fetch())
                                    {
                                    echo "<option value='".$users['userID']."'>" .   $users['Firstname']." ".$users['Surname'].   "</option>";

                                    }
                                    
                                    ?>
                                </select>
                                    <?php
             
             echo "<br> Current User : $u"; ?>

                                </td>
                            </tr>
                            <tr>
                                <td><p>Supervisor?</p></td>
                                <td>
                                    <select name = super <?php echo "value = $sup"; ?>>
                                        <option value="0">NO</option>
                                        <option value="1">YES</option>
                                    </select>
                                </td>
                                
                            </tr>
                            <tr>
                                <td></td>
                                <td ><input type="submit" value = "Add Shift"></td>

                            </tr>
                            
                            <input type="hidden" name = "mode" value="edit">
                            <input type="hidden" name = "ID"  <?php echo "value = $sID"; ?> >
                        </form>
                    </table>
                    
               </div>
                
              <?php }
            else if($_SESSION["isadmin"] == 0)
            {
                echo"ADMIN STATUS REQUIERED";
            }
            else
            {
                echo"ERROR";
            }
    
        } 
        else 
        {
            echo"Please Log In";
        } ?>               
            </main>  
        </div><!--Body Wrapper-->
    </body><!--body-->
</html><!--Index Page-->