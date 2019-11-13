<?php if(isset($_SESSION["userID"])) 
        {
            if($_SESSION["isadmin"] == 1)
            {?>

        <?php}
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