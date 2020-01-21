var selectedRows = [];
////Initialise
function allShiftsInit()
{
    //Construct Top Bar
    var d = new Date();
    document.getElementById("t").innerHTML += " | Updated : ";
    document.getElementById("t").innerHTML += "<b>" + d.toLocaleTimeString() + "</b>";

    //Get and Display Current Shifts From Database
    HTTP_GET("wsAllShifts.php?search=0").then(JSON.parse).then(displayAll).catch(handleError); //Promise String

    ////Filter Search/////
    //Add Event Listener to Filter Button
    document.getElementById("btnFilter").addEventListener("click", function()
    {
        removeItem("ErrorMsg"); 
        
        var queryString = new URLSearchParams(new FormData(document.getElementById("formFilter"))).toString(); //Construct Query From Table Input
        HTTP_GET("wsAllShifts.php?search=1" + queryString).then(JSON.parse).then(displayAll).catch(handleError); //Promise String  
    });
    
    //Add Event Listener to CLEAR Filter Button
    document.getElementById("btnClear").addEventListener("click", function()
    {
        removeItem("ErrorMsg"); 
        HTTP_GET("wsAllShifts.php?search=0").then(JSON.parse).then(displayAll).catch(handleError); //Promise String  
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
        if (event.target == document.getElementById('myModal')) {  displayModal(false); }
    }

    //On click, modal exit button
    document.getElementById('option1').addEventListener("click", () => { displayModal(false); });

    ///Delete event
    $("#btnDelete").click(()=>{
       

        HTTP_POST_DELETE("wsDelete.php",selectedRows).then(JSON.parse).then(displayAll).catch(handleError); //Promise String   
    });

    filterJQ();
   
}
////Handle HTTP Errors
function handleError(error)
{
    //Remove old data
    removeItem("ErrorMsg");
    removeItem("table");

    //Create Error message as <P> Tag
    var p = document.createElement("P");
    p.setAttribute("id", "ErrorMsg");

    //Decide Response text
    if (error == 400)
    {
       var message = "Error - Refresh and check shift is still available";
    }
    else if (error == 404)
    {
       var message = "No Results Found";
    }
    else if (error == 414)
    {
       var message = "Error (Length Exceeded) - Edit Search Term And Try Again";
    }
    else if (error == 405)
    {
       var message = "Error (Wrong Method) - Search Using GET Method Only";
    }
    else if (error == 500)
    {
       var message = "Error - Server malfunction, Try gain later";
    }
    else
    {
       var message = "Unknown Error!!, BEEPBORP : " + error; 
    }

    //Attach message to <p> and attach to body
    var m = document.createTextNode(message);
    p.appendChild(m);
    document.getElementById("returndiv").appendChild(p);
}
////GET XHR
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
                console.log("no");
            }
            else
            {
                resolve(e.target.responseText);
                console.log("yes");

            }
        });
       
        XHR.send();
        
    });
    return p;
}
////POST XHR
function HTTP_POST_DELETE(URL, IDs)
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
                resolve(e.target.responseText);
            }
        });
       
        XHR.send("selectedRows="+JSON.stringify(selectedRows));
    });
    return p;
}
////Display Returned Data
function displayAll(shifts)
{
    selectedRows = [];

    removeItem("table");

    $("#returndiv").append($("<table></table>").attr("id", "table"));
    $("#table").append($("<tbody></table>").attr("id", "tb"));
    $("#tb").append($("<tr></tr>").attr("id", "tableHeading"));

    //Set headings
    ["Shift ID", "Date", "Day", "Start Time", "Finish Time", "Supervisor?"].forEach(heading =>
    {
        $("#tableHeading").append($("<th></th>").text(heading));
    });

   // document.getElementById("noRes").style.display = "block";

    shifts.forEach(shift =>
    {

        ////////PRINT SHIFTS////////

        $("#tb").append($("<tr></tr>").attr("id", "rw").attr("class", shift.ShiftID));

       // document.getElementById("noRes").style.display = "none";

        var varSID = shift.ShiftID;
        var varStart = shift.Start.substr(0, 5);
        var varEnd = shift.End.substr(0, 5);
        var varDate = shift.Date;
        var varDay = dayOfWeek(varDate);

        if (shift.Supervisor == 1){  var varS = "Yes";  }  else  {  var varS = "No";  }

        [varSID, varDate, varDay, varStart, varEnd, varS].forEach(data => { $("." + shift.ShiftID).append($("<td></td>").text(data)); });

        $("." + varSID).click(() =>
        {

            if(!selectedRows.includes(varSID))
            {
                $("." + varSID).css("background-color", "yellow");

                selectedRows.push(varSID);
            }
            else
            {
                $("." + varSID).removeAttr("style");

                if (selectedRows.indexOf(varSID) > -1) 
                {
                   selectedRows.splice(selectedRows.indexOf(varSID), 1);
                }
            }
            

            



        });
    });

    
}
