function messagesInit() {
    var d = new Date();
    document.getElementById("t").innerHTML += " | Updated : ";
    document.getElementById("t").innerHTML += "<b>" + d.toLocaleTimeString() + "</b>";
    HTTP_GET("php/TEST.php?search=0").then(JSON.parse).then(displayMsgs).catch(handleError); //Promise String


    document.getElementById("btnFilter").addEventListener("click", function () {
        removeItem("ErrorMsg");
        var queryString = new URLSearchParams(new FormData(document.getElementById("formFilter"))).toString();

        HTTP_GET("php/TEST.php?search=1&" + queryString).then(JSON.parse).then(displayMsgs).catch(handleError); //Promise String  
    });

    document.getElementById("inDate").disabled = true;

    document.getElementById("selectDate").addEventListener("change", function () {

        if (document.getElementById("selectDate").value == "between") {
            document.getElementById("inDate").disabled = false;

        }
        if (document.getElementById("selectDate").value == "after") {
            document.getElementById("inDate").disabled = true;

        }
        if (document.getElementById("selectDate").value == "before") {
            document.getElementById("inDate").disabled = true;

        }
    });
    // document.getElementById("selectReciever").addEventListener("change", function () {

    //     if (document.getElementById("selectDate").value == "between") {
    //         document.getElementById("inDate").disabled = false;

    //     }
    //     if (document.getElementById("selectDate").value == "after") {
    //         document.getElementById("inDate").disabled = true;

    //     }
    //     if (document.getElementById("selectDate").value == "before") {
    //         document.getElementById("inDate").disabled = true;

    //     }
    // });
}

function handleError(error) {
    removeItem("ErrorMsg");
    removeItem("table");

    var Err = document.getElementById("error");

    var message = "";

    var p = document.createElement("P");
    p.setAttribute("id", "ErrorMsg");

    if (error == 400) {
        message = "Error - Check if shift is still available";
    }
    if (error == 404) {
        message = "No Results Found";
    }
    if (error == 414) {
        message = "Error (Length Exceeded) - Edit Search Term And Try Again";
    }
    if (error == 405) {
        message = "Error (Wrong Method) - Search Using GET Method Only";
    }

    var m = document.createTextNode(message);
    p.appendChild(m);
    document.getElementById("returndiv").appendChild(p);
}

function HTTP_GET(url) {
    var p = new Promise((resolve, reject) => {
        var XHR = new XMLHttpRequest();
        XHR.open('GET', url);

        XHR.addEventListener("load", (e) => {
            if (e.target.status >= 400 && e.target.status <= 599) {
                reject(e.target.status);
                console.log("no");
            }
            else {
                resolve(e.target.responseText);
                console.log("yes");
            }
        });
        XHR.send();
    });
    return p;
}

function displayMsgs(msgs) {

    removeItem("table");
    var t = document.createElement("TABLE"); //Create Table
    t.setAttribute("id", "table"); //Set table ID

    var tr = document.createElement("TR"); //Create Row

    //Set headings
    ["Date", "Day", "Receiver", "Sender", "Message"].forEach(heading => {
        var th = document.createElement("TH");
        var textNode = document.createTextNode(heading);
        th.appendChild(textNode);
        tr.appendChild(th);
    });

    t.appendChild(tr); //Add row to table


    for (var i = 0; i < msgs.length; i++)
    {


    var tr2 = document.createElement("TR");
    tr2.setAttribute("id", "rw");

    tr2.setAttribute("id", "rw");
    tr2.setAttribute("class", msgs[i].id);

    var varDate = msgs[i].Date;

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

    
    var varReceiver = msgs[i].R;
    var varSender = msgs[i].S;
    var varMessage = msgs[i].Message;

    

    [varDate, varDay, varReceiver, varSender, varMessage].forEach(data => {
        var td = document.createElement("TD");
        var textNode2 = document.createTextNode(data);
        td.appendChild(textNode2);
        tr2.appendChild(td);
    });

    /////event listeners on rows
    tr2.addEventListener("click", () => {

    });



    t.appendChild(tr2);

}

    ////////////////////////

document.getElementById("returndiv").appendChild(t);

}

function removeItem(I) {
    if (document.getElementById(I)) {
        var element = document.getElementById(I);
        element.parentNode.removeChild(element);
    }
}
