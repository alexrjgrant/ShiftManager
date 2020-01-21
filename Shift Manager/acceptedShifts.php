<?php session_start();  ?>

<?php $session_value=$_SESSION['userID']; ?>

<html lang="en">
<!--Index Page-->

<head>

    <meta charset="utf-8">
    <!--Set Charset-->

    <script type='text/javascript' src='js/acceptedShifts.js'></script>
    <script type='text/javascript' src='js/topBar.js'></script>
    <script type='text/javascript' src='js/JQ.js'></script>
    <script type='text/javascript' src='js/common.js'></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <!--Includes CSS File-->
    <link rel="stylesheet" type="text/css" href="css/modal.css">
    <!--Includes CSS File-->

    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico"> <!-- Set Favicon -->

    <title>Staff Manager</title>
    <!--Page Title-->

</head>


<body onload="acceptedShiftsInit(); initTopBar();">
    <!--.-->

    <div id="wrapper">
        <!--Body Wrapper-->

        <?php include 'snippets/header.html'; ?>

        <?php if(isset($_SESSION["userID"])) 
        {
             ?>
        <main>

            <?php include 'snippets/topBar.html'; ?>

            <div id="mh">
                <h4 id="main_heading">Accepted Shifts</h4>
                <!--Main heading-->
            </div>

            <br />


            <div id="fDiv">

            </div>

            <div id="filterDiv">



                <table>
                    <tr>
                        <th id="filterHeader" colspan="4">Filters</th> <span class="close" id="closeFilter">×</span>
                    </tr>
                </table>

                <form id="formFilter">

                    <table>


                        <tr>
                            <td>Date</td>
                            <td><input class="inWidth" type="date" name="dateStart"></td>
                            <td><input id="inDate" type="date" class="inWidth" name="dateEnd"></td>
                            <td>
                                <select name="modeDate" id="selectDate">
                                    <option value="after">After</option>
                                    <option value="between">Between</option>
                                    <option value="before">Before</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Start</td>
                            <td><input type="time" name="startStart" class="inWidth"></td>
                            <td><input id="inStart" type="time" name="startEnd" class="inWidth"></td>
                            <td>
                                <select name="modeStart" id="selectStart">
                                    <option value="after">After</option>
                                    <option value="between">Between</option>
                                    <option value="before">Before</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>End</td>
                            <td><input type="time" name="endStart" class="inWidth"></td>
                            <td><input type="time" name="endEnd" class="inWidth" id="inEnd"></td>
                            <td>
                                <select name="modeEnd" id="selectEnd">
                                    <option value="after">After</option>
                                    <option value="between">Between</option>
                                    <option value="before">Before</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Order</td>
                            <td>
                                <select name="orderBy" id="selectOrder">
                                    <option value="Date">Date</option>
                                    <option value="Start">Start</option>
                                    <option value="End">End</option>
                                </select>
                            </td>
                            <td>
                                <select name="ascDesc" id="selectO">
                                    <option value="ASC">ASC</option>
                                    <option value="DESC">DESC</option>

                                </select>
                            </td>
                            <td></td>
                        </tr>
                    </table>
                    <div id="btnsDiv"> <input type="button" name="clear" value="CLEAR" id="btnClear" class="btnFC">

                        <input type="button" name="search" value="FILTER" id="btnFilter" class="btnFC">
                    </div>
                   
                    <br>

                    <div id="sd">
                        <table>
                            <tbody>
                                <tr>
                                    <td><strong>Search</strong> </td>
                                    <td> <input id="SEARCH"> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </form>

            </div>

            <br>

            <div id="returndiv"></div>


            <br><br>

        </main>
        <?php
}
        else 
        {
            echo"Please Log In";
        } ?>


        <!-- The Modal -->
        <div id="myModal" class="modal">

            <!-- Modal content -->
            <div class="modal-content">
                <div id="mc">
                    <span class="close">&times;</span>
                    <h2 id="modalHead">Please confirm selection</h2>
                    <p id="warning1"></p>
                    <p id="shiftDate"> </p>
                    <p id="shiftTime"></p>
                    <p id="warning2"></p>
                    <input type="button" id=option1 value="Exit">
                    <input type="button" id=option2 value="Confirm">
                </div>
            </div>

        </div>

    </div>
    <!--Body Wrapper-->
</body>
<!--body-->

<script type="text/javascript">
    var curUserID = '<?php echo $session_value;?>';
</script>

</html>
<!--Index Page-->