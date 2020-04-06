//Global Variables
var nxtShift;
var varNumMsgs = 0;

//Initialiser
function initTopBar()
{
    //Get rows from database, calculate, display
    var promise1 = HTTP_GET("php/wsAcceptedShifts.php?search=0").then(JSON.parse).then(displayNext).catch(handleErrorTB); //Promise String 
    var promise2 = HTTP_GET("php/numMsgs.php").then(JSON.parse).then(numMsgs).catch(handleErrorTB);
    Promise.all([promise1, promise2]).then(DisplayTopBar);
}

function handleErrorTB(error) //Generic error
{
    document.getElementById("t").innerHTML = "ERROR!";
} 
// XHR GET
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
                console.log("Reject");
            }
            else
            {
                resolve(e.target.responseText);
                console.log("Resolve");
            }
        });
        XHR.send();
    });
    return p;
}
//Calculate available shifts
function displayNext(shifts)
{

    var d = new Date();

    var e = new Date(shifts[0].Date);
    var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
    var varDay = weekday[e.getDay()];

    var numDays = ((e-d) / (1000 * 60 * 60 * 24));

    if(numDays > 7)
    {    
        nxtShift = Math.ceil(numDays) + " Days";
    }
    if(numDays <= 7)
    {
        if(numDays == 1)
        {    
            nxtShift = "Tomorrow";
        }
        if(numDays == 0)
        {    
            nxtShift = "Today";
        }
        else
        {
            nxtShift = varDay;
        }
    }
}
   

//calculate num of messages in inbox
function numMsgs(shifts)
{
    varNumMsgs = shifts.length;
}
//display totals
function DisplayTopBar(shifts)
{
    var d = new Date();

    var varTopBar = document.getElementById("t");

    varTopBar.innerHTML = `Next Shift : <b> ${nxtShift} </b> | Messages : <b> ${varNumMsgs} </b> | Updated : <b> ${d.toLocaleTimeString()} </b>`;
}