////Initialise
function acceptedShiftsInit()
{
    //Construct Top Bar
    var d = new Date();
    document.getElementById("t").innerHTML += " | Updated : ";
    document.getElementById("t").innerHTML += "<b>" + d.toLocaleTimeString() + "</b>";

    //Get and Display Current Shifts From Database
    HTTP_GET("wsAcceptedShifts.php?search=0").then(JSON.parse).then(displayAccepted).catch(handleError); //Promise String

    ////Filter Search/////
    //Add Event Listener to Filter Button
    document.getElementById("btnFilter").addEventListener("click", function()
    {
        removeItem("ErrorMsg"); 
        
        var queryString = new URLSearchParams(new FormData(document.getElementById("formFilter"))).toString(); //Construct Query From Table Input
        HTTP_GET("wsAcceptedShifts.php?search=1&" + queryString).then(JSON.parse).then(displayAccepted).catch(handleError); //Promise String  
    });
    
    //Add Event Listener to CLEAR Filter Button
    document.getElementById("btnClear").addEventListener("click", function()
    {
        removeItem("ErrorMsg"); 
        HTTP_GET("wsAcceptedShifts.php?search=0").then(JSON.parse).then(displayAccepted).catch(handleError); //Promise String  
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
       var message = "Unknown Error!!, BEEPBORP :/"; 
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
function HTTP_POST(URL, ID, MODE)
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
        XHR.send("shiftID=" + ID + "&mode=" + MODE);
    });
    return p;
}
////Display Returned Data
function displayAccepted(shifts)
{
    ////Create table////
    removeItem("table"); //remove table if exists to avoid duplication
    var t = document.createElement("TABLE"); //Create Table
    t.setAttribute("id", "table"); //Set table ID

    var tr = document.createElement("TR"); //Create Row

    //Set headings
    ["Shift ID", "Date", "Day", "Start Time", "Finish Time", "Supervisor?"].forEach(heading =>
    {
        var th = document.createElement("TH");
        var textNode = document.createTextNode(heading);
        th.appendChild(textNode);
        tr.appendChild(th);
    });

    t.appendChild(tr); //Add row to table

    //Loop all results
    for (var i = 0; i < shifts.length; i++)
    {

        //Create and attribute rows
        var tr2 = document.createElement("TR");
        tr2.setAttribute("id", "rw");
        tr2.setAttribute("class", shifts[i].ShiftID);

        //Colour according to availabillity
        if (shifts[i].Available == 1)
        {
            tr2.style.backgroundColor = "orange";
        }
        else if (shifts[i].Available == 0)
        {
            tr2.style.backgroundColor = null;
        }
        else
        {
            tr2.style.backgroundColor = "red";
        }

        ////Asign data to variables/
        var varSID = shifts[i].ShiftID;
        var varDate = shifts[i].Date;

        //Get day of week from date
        var d = new Date(Date.parse(varDate));
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var varDay = weekday[d.getDay()];

        var varStart = shifts[i].Start.substr(0, 5); //Shorten time format
        var varEnd = shifts[i].End.substr(0, 5);
       
        if (shifts[i].Supervisor == 1) { varS = "Yes" } else { var varS = "No"; } //Convert to language

        ////Add data from variables to rows
        [varSID, varDate, varDay, varStart, varEnd, varS].forEach(data =>
        {
            var td = document.createElement("TD");
            var textNode2 = document.createTextNode(data);
            td.appendChild(textNode2);
            tr2.appendChild(td);
        });

        t.appendChild(tr2); //add row to table
    }

    document.getElementById("returndiv").appendChild(t); //add table to body

    //Loop displayed rows
    document.querySelectorAll('#rw').forEach(item =>
    {
        //Add Click Listener to all Rows
        item.addEventListener('click', event =>
        {
            //Get data from table row
            var varShiftDate = item.getElementsByTagName("td")[1].innerHTML
            var varShiftDay = item.getElementsByTagName("td")[2].innerHTML.substr(0, 3);
            var varShiftStart = item.getElementsByTagName("td")[3].innerHTML;
            var varShiftEnd = item.getElementsByTagName("td")[4].innerHTML;

            //Alter Modal
            document.getElementById('warning2').style.display = "none";
            document.getElementById('shiftDate').innerHTML = `${varShiftDate} (${varShiftDay})`
            document.getElementById('shiftTime').innerHTML = `${varShiftStart} - ${varShiftEnd}`

            //If shift currently up for cover
            if (item.style.backgroundColor == "orange")
            {
                //Alter modal text
                document.getElementById('warning1').innerHTML = "Are you sure? The shift will no longer be available to cover"

                displayModal(true); //Show updated modal

                //Confirm button listener
                document.getElementById('option2').addEventListener("click", () =>
                {
                    HTTP_POST("wsSwap.php", item.getAttribute("class"), "claim").then(JSON.parse).catch(handleError); //Promise String 

                    setTimeout(function()
                    {
                        var queryString = new URLSearchParams(new FormData(document.getElementById("formFilter"))).toString(); //Construct Query From Table Input
                        HTTP_GET("wsAcceptedShifts.php?search=1&" + queryString).then(JSON.parse).then(displayAccepted).catch(handleError); //Promise String
                    }, 100);

                    displayModal(false); //remove modal and listener
                });

            }
            //If asking for shift cover
            else
            {
                //Alter modal text
                document.getElementById('warning1').innerHTML = "Are you sure? If not accepted, the shift remains your responsibility!";
            
                displayModal(true); //Show updated modal

                //Confirm button listener
                document.getElementById('option2').addEventListener("click", () =>
                {
                    HTTP_POST("wsSwap.php", item.getAttribute("class"), "swap").then(JSON.parse).catch(handleError);
                    setTimeout(function()
                    {
                        var queryString = new URLSearchParams(new FormData(document.getElementById("formFilter"))).toString(); //Construct Query From Table Input
                        HTTP_GET("wsAcceptedShifts.php?search=1&" + queryString).then(JSON.parse).then(displayAccepted).catch(handleError); //Promise String
                    }, 100);

                    displayModal(false); //remove modal and listener
                });
            }
        });
    });
}

/////////Time Savers
function removeItem(I)
{
    if (document.getElementById(I))
    {
        var element = document.getElementById(I);
        element.parentNode.removeChild(element);
    }
}
function displayModal(display)
{
    if (display)
    {
        document.getElementById('myModal').style.display = "block";
    }
    else
    {
        document.getElementById('myModal').style.display = "none";
        
        var old_element = document.getElementById("option2");
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
    }
}