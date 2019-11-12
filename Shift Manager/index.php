<html lang="en"><!--Index Page--> 

<head>

    <meta charset="utf-8"> <!--Set Charset-->
    
<!--<script type='text/javascript' src='js/js.js'></script>-->

    <link rel="stylesheet" type="text/css" href="css/login.css"><!--Includes CSS File-->

    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico"> <!--Set Favicon-->

    <title>Staff Manager</title> <!--Page Title-->
 
</head>
    
    <body><!--.-->
 
        <div id = "wrapper"><!--Body Wrapper-->
        

     <header><!--Header Page Top-->
    
    <h1 id = "title">AG | Staff Management System</h1> <!--Website Title-->
    
</header><!--Header Page Top--> 

            
            <main> 
                
                <div id = "mh">
                    <h4 id = "main_heading">Please sign in to continue</h4> <!--Main heading-->
                </div>
                
                                
                <div id = "lForm">
                    <form method="post" action="login.php">
                        <table>
                            <tr>
                                <th>User ID:</th>
                                <th>Password:</th>
                            </tr>
                            <tr>
                                <td><input id = "ID" name="un" maxlength="8" autofocus></td>
                                <td><input id = "PAS" name="pw" type="password" maxlength="16" ></td>
                            </tr>
                        </table>
                   
                    <input id = "btnLogin" name = "submit" type="submit" value="Sign In">  
                        </form>
               </div>
                
            </main>  
        </div><!--Body Wrapper-->
        <div class="footer">
           <span id = "cr">Copyright AG 2019</span>
           
            <span id ="o"><a href="css/login.css">Blah Blah Blah</a></span>
            <p id = "w"> Unauthorized access constitutes a breach of the <a href="https://www.gov.uk/data-protection">Data Protection Act 2018</a></p>
        </div>
    </body><!--body-->
</html><!--Index Page-->