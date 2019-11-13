<?php session_start();  ?>
<html lang="en"><!--Index Page--> 

<?php include 'snippets/head.html'; ?> 
     
    
    <body onload="allShiftsInit()"><!--.-->
 
        <div id = "wrapper"><!--Body Wrapper-->
        

     <?php include 'snippets/header.html'; ?>
            
        
            <main> 
                
                 <?php if(isset($_SESSION["userID"])) 
        {
            if($_SESSION["isadmin"] == 1)
            { ?>
                 
                <div id = "mh">
                    <h4 id = "main_heading">All Shifts</h4> <!--Main heading-->
                </div>
                
                <br/>
                
<form name = "frm" id = "frm">                
    <table >

		<tr>
			<td><p>DATE</p></td>
			<td><input name="date" type="date"></td>
		</tr>
		<tr>
			<td>TIME</td>
			<td><input name="start" type="time"><p>  </p><input name="end" type="time"> </td>
		</tr>
		<tr>
			<td>USER</td>
			<td> 
                <select name = "uID">
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
			<td>Available?</td>
			<td><select name = av>
                    <option value="0">NO</option>
                    <option value="1">YES</option>
                </select> 
            </td>
		</tr>
		<tr>
			<td>Supervisor</td>
			<td>
                <select name = sup>
                    <option value="0">NO</option>
                    <option value="1">YES</option>
                </select>
            </td>
		</tr>
        <tr>
        <td><input type="hidden" name="search" value="1"></td>
            <td><input type="button" value = "SEARCH" id ="s"></td>
        </tr>
    </table>
</form>          
                                
                <div id = "returndiv"></div>
                
                
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
                
                
                
                
                
                
                <!-- Trigger/Open The Modal -->


<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
      <div id = "mc">
    <span class="close">&times;</span>
      <h2 id = "modalhead" >Select Function</h2>
      
      <input type="button" id = delete value="Remove Shift">
      <input type="button" id = edit value="Edit Shift">
      </div>
  </div>

</div>

                
                
                
                
            </main>  
        </div><!--Body Wrapper-->
    </body><!--body-->
</html><!--Index Page-->