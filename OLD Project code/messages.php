<?php

session_start();
?>
<html lang="en"><!--Index Page--> 

<?php include 'snippets/head.html'; ?> 

    
    <body onload="msgsInit()"><!--.-->
 
        <div id = "wrapper"><!--Body Wrapper-->

     <?php include 'snippets/header.html'; ?>

            <?php if(isset($_SESSION["userID"])) 
        {
             ?> 
            <main> 
                 
                <div id = "mh">
                    <h4 id = "main_heading">Messages</h4> <!--Main heading-->
                </div>
                
                <br/>
                         
               <div id = "returndiv">
                    
                    
                    
               </div>
                
            </main>
            <?php
}
        else 
        {
            echo"Please Log In";
        } ?>    
        </div><!--Body Wrapper-->
    </body><!--body-->
</html><!--Index Page-->