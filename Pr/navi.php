<?php

session_start();
 ?>

<html lang="en"><!--Index Page--> 

    <?php if(isset($_SESSION["userID"])) {  ?>
    
 <?php include 'snippets/head.html'; ?> 
     
    
    <body><!--.-->
 
        <div id = "wrapper"><!--Body Wrapper-->
        
     <?php include 'snippets/header.html'; ?>
            
            <main> 
                <p id = "logState">You're logged in as <?php include 'snippets/getUserName.php'; ?>. <a href="logout.php">NOT YOU?</a></p>
                
                <div id = "mh">
                    <h4 id = "main_heading">Choose A Function</h4> <!--Main heading-->
                </div>
                
                <br/>
                                
                <div>
                    
                    <table>
                        <tr>
                            <td><form action="avShifts.php"><input type="submit" value="View Avalible Shifts"></form></td>
                            <td><form action="curShifts.php"><input type="submit" value="View Current Shifts"></form></td>
                           
                        </tr>
                        <tr>
                            <td><form action="messages.php"><input type="submit" value="View Messages"></form></td>
                            <td><input type="button" value="Send A Message"></td>
                            
                        </tr>
                        <tr>
                            <td><form action="addShift.php"><input type="submit" value="Add Shifts"></form></td>                 <td><form action="allShifts.php"><input type="submit" value="All Shifts"></form></td>              
                        </tr>
                    </table>
                    
               </div>
                
            </main>  
        </div><!--Body Wrapper-->
    </body><!--body-->
    
    <?php  } else {echo"Please Log In";} ?>
    
    
</html><!--Index Page-->
