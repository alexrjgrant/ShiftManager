function availableShiftsInit()
{
    var d = new Date();
    document.getElementById("t").innerHTML += " | Updated : ";
    document.getElementById("t").innerHTML += "<b>" + d.toLocaleTimeString() + "</b>";
    HTTP_GET("wsAvailableShifts.php?search=0").then(JSON.parse).then(displayAvailableShifts).catch(handleError); //Promise String


    document.getElementById("btnFilter").addEventListener("click", function()
    {
        removeItem("ErrorMsg");
        var queryString = new URLSearchParams(new FormData(document.getElementById("formFilter"))).toString();


        HTTP_GET("wsAvailableShifts.php?search=1&" + queryString).then(JSON.parse).then(displayAvailableShifts).catch(handleError); //Promise String  


    });

    document.getElementById("inDate").disabled = true;
    document.getElementById("inStart").disabled = true;
    document.getElementById("inEnd").disabled = true;

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
}

function handleError(error)
{
    removeItem("ErrorMsg");
    removeItem("table");

    var Err = document.getElementById("error");

    var message = "";

    var p = document.createElement("P");
    p.setAttribute("id", "ErrorMsg");

    if (error == 400)
    {
        message = "Error - Check if shift is still available";
    }
    if (error == 404)
    {
        message = "No Results Found";
    }
    if (error == 414)
    {
        message = "Error (Length Exceeded) - Edit Search Term And Try Again";
    }
    if (error == 405)
    {
        message = "Error (Wrong Method) - Search Using GET Method Only";
    }

    var m = document.createTextNode(message);
    p.appendChild(m);
    document.getElementById("returndiv").appendChild(p);
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

    document.getElementById("noRes").style.display = "block";

    for (var i = 0; i < shifts.length; i++)
    {
        var printShift = true;

        console.log("User ID - " + shifts[i].userID + " : " + curUserID);

        if (shifts[i].userID != curUserID) //same ID
        {
            for (var ii = 0; ii < shifts.length; ii++)
            {
                console.log("Shift ID - " + i + " : " + ii);
                console.log(shifts[i].Date + " " + shifts[ii].Date);

                if (shifts[i].Date == shifts[ii].Date && i != ii) //same date  CHANGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                {
                    console.log("DATE CLASH");
                    console.log(shifts[i].Start + " " + shifts[i].End);
                    console.log(shifts[ii].Start + " " + shifts[ii].End);

                    if (shifts[ii].End <= shifts[i].Start || shifts[ii].Start >= shifts[i].End)
                    {
                        //working
                    }
                    else
                    {
                        console.log("TIME CLASH");
                        console.log("FAIL");
                        console.log("*****************************************");
                        printShift = false;
                    }
                }
                console.log("NEXT");
                console.log("------------------------");
            }
        }
        else
        {
            console.log("User Clash");
            printShift = false;
        }
        if (printShift)
        {
            ////////PRINT SHIFTS////////

            document.getElementById("noRes").style.display = "none";

            t.appendChild(tr); //Add row to table

            var tr2 = document.createElement("TR");
            tr2.setAttribute("id", "rw");

            tr2.setAttribute("id", "rw");
            tr2.setAttribute("class", shifts[i].ShiftID);

            var varSID = shifts[i].ShiftID;
            var varDate = shifts[i].Date;
 
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

            var varStart = shifts[i].Start.substr(0, 5);
            var varEnd = shifts[i].End.substr(0, 5);
            var varUID = shifts[i].Firstname + " " + shifts[i].Surname;
            var varUSER = shifts[i].userID;
            var varS = "No";

            if (shifts[i].Supervisor == 1)
            {
                varS = "Yes"
            }

            [varSID, varDate, varDay, varStart, varEnd, varS].forEach(data =>
            {
                var td = document.createElement("TD");
                var textNode2 = document.createTextNode(data);
                td.appendChild(textNode2);
                tr2.appendChild(td);
            });

            t.appendChild(tr2);

        }
    }

    document.getElementById("returndiv").appendChild(t);

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
            document.getElementById('shiftDate').innerHTML = `${varShiftDate} (${varShiftDay})`
            document.getElementById('shiftTime').innerHTML = `${varShiftStart} - ${varShiftEnd}`

            //Alter modal text
            document.getElementById('warning1').innerHTML = "Are you sure? Once accepted, the shift is your responsibillity"

            displayModal(true); //Show updated modal

            //Confirm button listener
            document.getElementById('option2').addEventListener("click", () =>
            {
                alert(item.getAttribute("class"))
                HTTP_POST("wsClaimShift.php", item.getAttribute("class")).then(JSON.parse).catch(handleError); //Promise String 

                setTimeout(function()
                {
                    var queryString = new URLSearchParams(new FormData(document.getElementById("formFilter"))).toString(); //Construct Query From Table Input
                    HTTP_GET("wsAvailableShifts.php?search=1&" + queryString).then(JSON.parse).then(displayAccepted).catch(handleError); //Promise String
                }, 100);

                displayModal(false); //remove modal and listener
            });
        });
    });
}

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