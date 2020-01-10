function availableShiftsInit()
{
    //Construct Top Bar
    var d = new Date();
    document.getElementById("t").innerHTML += " | Updated : ";
    document.getElementById("t").innerHTML += "<b>" + d.toLocaleTimeString() + "</b>";

    //Get and Display Current Shifts From Database
    HTTP_GET("wsAvailableShifts.php?search=0").then(JSON.parse).then(displayAvailableShifts).catch(handleError); //Promise String

    ////Filter Search/////
    //Add Event Listener to Filter Button
    document.getElementById("btnFilter").addEventListener("click", function()
    {
        removeItem("ErrorMsg");

        var queryString = new URLSearchParams(new FormData(document.getElementById("formFilter"))).toString(); //Construct Query From Table Input
        HTTP_GET("wsAvailableShifts.php?search=1&" + queryString).then(JSON.parse).then(displayAvailableShifts).catch(handleError); //Promise String  
    });

    //Add Event Listener to CLEAR Filter Button
    document.getElementById("btnClear").addEventListener("click", function()
    {
        removeItem("ErrorMsg");
        HTTP_GET("wsAvailableShifts.php?search=0").then(JSON.parse).then(displayAvailableShifts).catch(handleError); //Promise String  
    });

    //Start Disabled 
    document.getElementById("inDate").disabled = true;
    document.getElementById("inStart").disabled = true;
    document.getElementById("inEnd").disabled = true;

    //Change Disabled setting of Inputs
    document.getElementById("selectDate").addEventListener("change", function()
    {

        if (document.getElementById("selectDate").value == "between")
        {
            document.getElementById("inDate").disabled = false;

        }
        if (document.getElementById("selectDate").value == "after")
        {
            document.getElementById("inDate").disabled = true;

        }
        if (document.getElementById("selectDate").value == "before")
        {
            document.getElementById("inDate").disabled = true;

        }
    });
    document.getElementById("selectStart").addEventListener("change", function()
    {

        if (document.getElementById("selectStart").value == "between")
        {
            document.getElementById("inStart").disabled = false;

        }
        if (document.getElementById("selectStart").value == "after")
        {
            document.getElementById("inStart").disabled = true;

        }
        if (document.getElementById("selectStart").value == "before")
        {
            document.getElementById("inStart").disabled = true;

        }
    });
    document.getElementById("selectEnd").addEventListener("change", function()
    {

        if (document.getElementById("selectEnd").value == "between")
        {
            document.getElementById("inEnd").disabled = false;

        }
        if (document.getElementById("selectEnd").value == "after")
        {
            document.getElementById("inEnd").disabled = true;

        }
        if (document.getElementById("selectEnd").value == "before")
        {
            document.getElementById("inEnd").disabled = true;

        }
    });

    ////Modal Settings////
    //Get the <span> element that closes the modal
    var modalExit = document.getElementsByClassName("close")[0];

    //When the user clicks on (x), close the modal
    modalExit.onclick = function() { displayModal(false); }

    //When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event)
    {
        if (event.target == document.getElementById('myModal'))
        {
            displayModal(false);
        }
    }

    //On click, modal exit button
    document.getElementById('option1').addEventListener("click", () => {  displayModal(false);  });

    filterJQ();
}

function handleError(error)
{
    removeItem("ErrorMsg");
    removeItem("table");

    var message = "";


         if (error == 200)  {  console.log("OK 200") }
    else if (error == 400)  {  message = "Error - Check if shift is still available";  }
    else if (error == 404)  {  message = "No Results Found";  }
    else if (error == 414)  {  message = "Error (Length Exceeded) - Edit Search Term And Try Again";  }
    else if (error == 405)  {  message = "Error (Wrong Method) - Search Using GET Method Only";  }
    else                    {  message = "Unknown Error"; }

    $("#returndiv").append($("<p></p>").text(message + error).attr("id", "ErrorMsg"));
}

function HTTP_GET(url)
{
    var p = new Promise((resolve, reject) =>
    {
        var XHR = new XMLHttpRequest();
        XHR.open('GET', url);

        XHR.addEventListener("load", (e) =>
        {
            if (e.target.status >= 400 && e.target.status <= 599)
            {
                reject(e.target.status);
            }
            else
            {
                removeItem("ErrorMsg");
                resolve(e.target.responseText);
            }
        });
        XHR.send();
    });
    return p;
}

function HTTP_POST(URL, ID)
{
    var p = new Promise((resolve, reject) =>
    {
        var XHR = new XMLHttpRequest();

        XHR.open('POST', URL, true);
        XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        XHR.addEventListener("load", (e) =>
        {
            if (e.target.status >= 400 && e.target.status <= 599)
            {
                reject(e.target.status);
            }
            else
            {
                removeItem("ErrorMsg");
                resolve(e.target.responseText);
            }
        });
        XHR.send("shiftID=" + ID);
    });
    return p;
}

function displayAvailableShifts(shifts)
{

    removeItem("table");

    $("#returndiv").append($("<table></table>").attr("id", "table"));
    $("#table").append($("<tbody></table>").attr("id", "tb"));
    $("#tb").append($("<tr></tr>").attr("id", "tableHeading"));

    //Set headings
    ["Shift ID", "Date", "Day", "Start Time", "Finish Time", "Supervisor?"].forEach(heading =>
    {
        $("#tableHeading").append($("<th></th>").text(heading));
    });

    document.getElementById("noRes").style.display = "block";

    shifts.forEach(shift =>
    {

        ////////PRINT SHIFTS////////

        $("#tb").append($("<tr></tr>").attr("id", "rw").attr("class", shift.ShiftID));

        document.getElementById("noRes").style.display = "none";

        var varSID = shift.ShiftID;
        var varStart = shift.Start.substr(0, 5);
        var varEnd = shift.End.substr(0, 5);
        var varDate = shift.Date;
        var varDay = dayOfWeek(varDate);

        if (shift.Supervisor == 1){  var varS = "Yes";  }  else  {  var varS = "No";  }

        [varSID, varDate, varDay, varStart, varEnd, varS].forEach(data => { $("." + shift.ShiftID).append($("<td></td>").text(data)); });

        $("." + varSID).click(() =>
        {
            //Alter Modal
            document.getElementById('shiftDate').innerHTML = `${varDate} (${varDay})`;
            document.getElementById('shiftTime').innerHTML = `${varStart} - ${varEnd}`;

            //Alter modal text
            document.getElementById('warning1').innerHTML = "Are you sure? Once accepted, the shift is your responsibillity";

            displayModal(true); //Show updated modal

            //Confirm button listener
            document.getElementById('option2').addEventListener("click", () =>
            {
                HTTP_POST("wsClaimShift.php", varSID).catch(handleError); //Promise String 

                setTimeout(function()
                {
                    var queryString = new URLSearchParams(new FormData(document.getElementById("formFilter"))).toString(); //Construct Query From Table Input
                    HTTP_GET("wsAvailableShifts.php?search=1&" + queryString).then(JSON.parse).then(displayAvailableShifts).catch(handleError); //Promise String
                }, 100);

                displayModal(false); //remove modal and listener
            });
        });
    });

    setTimeout(function()
    {
       HTTP_GET("wsAcceptedShifts.php?search=0").then(JSON.parse).then(removeClash).catch(handleError);
    }, 50);
}

function removeClash(acceptedShifts)
{
    document.querySelectorAll('#rw').forEach(item =>
    {
        var remove = false;

        for (var i = 0; i < acceptedShifts.length; i++)
        {
            //Get data from table row
            var varShiftDate  = item.getElementsByTagName("td")[1].innerHTML;
            var varShiftStart = item.getElementsByTagName("td")[3].innerHTML;
            var varShiftEnd   = item.getElementsByTagName("td")[4].innerHTML;

            console.log(acceptedShifts[i].Date + " - " + varShiftDate);

            if (acceptedShifts[i].Date == varShiftDate)
            {
                console.log("DATE clash");
                console.log(acceptedShifts[i].Start + " : " + acceptedShifts[i].End);
                console.log(varShiftStart + " : " + varShiftEnd);

                if ((acceptedShifts[i].Start <= varShiftEnd) && (acceptedShifts[i].End >= varShiftStart))
                {
                    console.log("TIME clash REMOVE");
                    remove = true;
                }
                else
                {
                    console.log("PASS");
                }
                console.log("NEXT");
            }
        }
        if (remove)
        {
            item.parentNode.removeChild(item);
        }
    });
}

