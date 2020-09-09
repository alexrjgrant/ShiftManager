<?php session_start();  ?>
<html lang="en">
<!--Index Page-->

<?php include 'snippets/head.html'; ?>

<body>
    <!--.-->

    <div id="wrapper">
        <!--Body Wrapper-->


        <?php include 'snippets/header.html'; ?>


        <main>
            <?php if(isset($_SESSION["userID"])) 
        {
            if($_SESSION["isadmin"] == 1)
            {  ?>

            <div id="mh">
                <h4 id="main_heading">Add A Shift</h4>
                <!--Main heading-->
            </div>

            <br />
            <?php  $r = $_GET["r"]; if($r != ""){echo $r;}  ?>
            <div id="frm">

                <table>
                    <form action="wsAddShift.php" method="post">
                        <tr>
                            <td>
                                <p>Date</p>
                            </td>
                            <td><input name="date" type="date"></td>
                        </tr>
                        <tr>
                            <td>
                                <p>Start</p>
                            </td>
                            <td><input name="start" type="time"></td>
                        </tr>
                        <tr>
                            <td>
                                <p>End</p>
                            </td>
                            <td><input name="end" type="time"></td>
                        </tr>
                        <tr>
                            <td>
                                <p>User</p>
                            </td>
                            <td>
                                <select name="user">
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
                            <td>
                                <p>Supervisor?</p>
                            </td>
                            <td>
                                <select name=super>
                                    <option value="0">NO</option>
                                    <option value="1">YES</option>
                                </select>
                            </td>

                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" value="Add Shift"></td>

                        </tr>
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
    </div>
    <!--Body Wrapper-->
</body>
<!--body-->

</html>
<!--Index Page-->