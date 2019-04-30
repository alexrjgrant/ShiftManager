<html lang="en"><!--Index Page--> 

<?php include 'snippets/head.html'; ?> 
    
    
    <body><!--.-->
 
        <div id = "wrapper"><!--Body Wrapper-->
        

     <?php include 'snippets/header.html'; ?>
            
            <main> 
                
                
                
                 
                <div id = "mh">
                    <h4 id = "main_heading">Login</h4> <!--Main heading-->
                </div>
                
                <br/>
                                
                <div>
                    <form method="post" action="login.php">
                        <table>
                            <tr>
                                <th>User ID</th>
                                <th>Password</th>
                            </tr>
                            <tr>
                                <td><input id = "ID" name="un"></td>
                                <td><input id = "PAS" name="pw"></td>
                            </tr>
                        </table>
                   
                    <input id = "btnLogin" name = "submit" type="submit" value="Sign In">  
                        </form>
               </div>
                
            </main>  
        </div><!--Body Wrapper-->
    </body><!--body-->
</html><!--Index Page-->