function availableShiftsInit()
{
    var d = new Date();
    document.getElementById("t").innerHTML += " | Updated : ";
    document.getElementById("t").innerHTML += "<b>" + d.toLocaleTimeString() + "</b>";
    HTTP_GET("wsAvailableShifts.php?search=0").then(JSON.parse).then(numAv).catch(handleError); //Promise String


    document.getElementById("btnFilter").addEventListener("click", function()
    {
        removeItem("ErrorMsg");
        var queryString = new URLSearchParams(new FormData(document.getElementById("formFilter"))).toString();


        HTTP_GET("wsAvailableShifts.php?search=1&" + queryString).then(JSON.parse).then(numAv).catch(handleError); //Promise String  


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

function numAv(shifts)
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

    t.appendChild(tr); //Add row to table

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

                    if ((shifts[ii].Start >= shifts[i].Start && shifts[ii].Start <= shifts[i].End) || (shifts[ii].End >= shifts[i].Start && shifts[ii].End <= shifts[i].End))
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
            
            var tr2 = document.createElement("TR");
            tr2.setAttribute("id", "rw");

            tr2.setAttribute("id", "rw");
            tr2.setAttribute("class", shifts[i].id);

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

            ////////////////////////
        }
    }



    document.getElementById("returndiv").appendChild(t);


    // document.querySelectorAll('#rw').forEach(item => {
    //     item.addEventListener('click', event => {
    //         alert(item);
    //     })
    // })

}

function removeItem(I)
{
    if (document.getElementById(I))
    {
        var element = document.getElementById(I);
        element.parentNode.removeChild(element);
    }
}




//function init()
//{    
//    var d = new Date();
//    document.getElementById("t").innerHTML += " | Updated : " ;
//    document.getElementById("t").innerHTML += "<b>" + d.toLocaleTimeString() + "</b>";
//    HTTP_GET("test.php").then(JSON.parse).then(display).catch(handleError); //Promise String
//}
//function handleError(error)
//{    
//    removeItem("ErrorMsg");
//    
//    var Err = document.getElementById("error");
//
//    var message = "";
//    
//    var p = document.createElement("P");
//    p.setAttribute("id", "ErrorMsg");
//    
//    if(error == 400)
//    {
//        message = "Error - Check if shift is still available";
//    }
//    if(error == 404)
//    { 
//        message = "No Results Found";
//    }
//     if(error == 414)
//    {
//        message = "Error (Length Exceeded) - Edit Search Term And Try Again";
//    }
//    if(error == 405)
//    {
//        message = "Error (Wrong Method) - Search Using GET Method Only";
//    }
//    
//    var m = document.createTextNode(message);
//    p.appendChild(m);
//    document.getElementById("returndiv").appendChild(p);
//}
//
//function HTTP_GET(url) 
//{
//    var p = new Promise((resolve,reject)=>
//            { 
//                var XHR = new XMLHttpRequest();
//                XHR.open('GET', url);
//        
//                XHR.addEventListener("load", (e)=> 
//                {              
//                    if(e.target.status>=400 && e.target.status<=599)
//                    {
//                        reject(e.target.status); 
//                        console.log("no");
//                    } 
//                    else 
//                    {
//                        resolve(e.target.responseText);
//                         console.log("yes");
//                    }
//                });
//                XHR.send();
//            });
//    return p;
//}
//
//function display(shifts)
//{
//    var t  = document.createElement("TABLE"); //Create Table
//    t.setAttribute("id", "table"); //Set table ID
//    
//    var tr = document.createElement("TR"); //Create Row
//   
//    //Set headings
//    ["Shift ID","Date", "Start Time", "Finish Time", "Supervisor?","Staff Member"].forEach ( heading => 
//    {
//        var th = document.createElement("TH");
//        var textNode = document.createTextNode(heading);
//        th.appendChild(textNode);
//        tr.appendChild(th);
//    });
//
//    t.appendChild(tr); //Add row to table
//    
//    //Check for clashing shifts
//    l1: for(i=0;i<shifts.length;i++)
//    {
//        console.log(shifts[i].userID + " " + curUserID);
//        
//        if(shifts[i].userID == curUserID) //same ID
//        {
//                console.log("User Clash");
//                continue l1;
//        }
//        if(shifts[i].userID != curUserID)
//        {
//            for(ii=0;ii<shifts.length;ii++)
//            {
//                console.log(shifts[i].Date+" "+shifts[ii].Date);
//                
//                if(i != ii)
//                {
//                    if(shifts[i].Date == shifts[ii].Date) //same date  CHANGE!!!
//                    {
//                        console.log("Shift Clash");
//                        continue l1;                            
//                    }
//                }
//            }
//        }  
//        ////////PRINT SHIFTS////////
//        var tr2 = document.createElement("TR");
//        
//        tr2.setAttribute("id", "rw");
//        tr2.setAttribute("class", shifts[i].id);
//        
//        var varSID = shifts[i].ShiftID;
//        var varDate  = shifts[i].Date;
//        var varStart = shifts[i].Start;
//        var varEnd = shifts[i].End;
//        var varUID = shifts[i].Firstname + " " + shifts[i].Surname;
//        var varUSER = shifts[i].userID;
//        var varS = "No";
//        if(shifts[i].Supervisor == 1)
//        {
//            varS = "Yes"
//        }
//        
//        [varSID,varDate,varStart,varEnd,varS,varUID].forEach ( data => 
//        {
//            var td = document.createElement("TD");
//            var textNode2 = document.createTextNode(data);
//            td.appendChild(textNode2);
//            tr2.appendChild(td);
//        });
//        
//     /////event listeners on rows
//            tr2.addEventListener("click",()=>
//            {            
//                document.getElementById('myModal').style.display = "block";
//                
//                document.getElementById("edit").addEventListener("click",()=>
//                {
//                    document.getElementById("main_heading").innerHTML = varSID;
//                    //edit Function
//                    //trans to form.
//                    
//                    window.location="/editShift.php?date="+varDate+"&start="+varStart+"&end="+varEnd+"&sup="+varS+"&uID="+varUSER+"&u="+varUID+"&sID="+varSID;
//                });
//                
//                document.getElementById("delete").addEventListener("click",()=>
//                {
//                   if (confirm(`Are you sure? Once deleted, the shift cannot be recovered\n\n DATE : ${varDate} \n TIME : ${varStart} - ${varEnd} `))
//                    {           
//                       //dellll
//                        HTTP_DEL("wsDelete.php",varSID).catch(handleError);
//                        HTTP_GET("wsShifts.php?all=1").then(JSON.parse).then(displayAllShifts).catch(handleError); //Promise String
//                    }
//                });
//            });
//            
//        t.appendChild(tr2);
//    }
//        
//     document.getElementById("returndiv").appendChild(t);
//    
//}
//
//function removeItem(I)
//{
//    if(document.getElementById(I))
//        {
//            var element = document.getElementById(I);
//            element.parentNode.removeChild(element);
//        }
//}
//