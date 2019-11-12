<?php session_start();  ?>
<html lang="en"><!--Index Page--> 

 <?php include 'snippets/head.html'; ?> 
    
    <body><!--.-->
 
        <div id = "wrapper"><!--Body Wrapper-->

            
             <?php include 'snippets/header.html'; ?>
  
           
            <main> 
                 <?php if(isset($_SESSION["userID"])) 
        {
            ?> 
                
                <div id = "mh">
                    <h4 id = "main_heading">Send a Message</h4> <!--Main heading-->
                </div>
                
                <br/>
                   <?php  $r = $_GET["r"]; if($r != ""){echo $r;}  ?>          
                <div id = "frm">
                    
                    <table>
                        <form action="wsSendMsg.php" method="post">
                           
                                <tr>
                                <td><p>User</p></td>
                                <td>
                                <select name = "re">
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

                                </td>
                            </tr>
                             <tr>
                                <td><p>Message</p></td>
                                <td><input name = "msg"></td>
                            </tr>
                           
                            <tr>
                                <td></td>
                                <td ><input type="submit" ></td>

                            </tr>
                        </form>
                    </table>
                    
               </div>
                
              <?php }
            
           
        else 
        {
            echo"Please Log In";
        } ?>               
            </main>  
        </div><!--Body Wrapper-->
    </body><!--body-->
</html><!--Index Page-->