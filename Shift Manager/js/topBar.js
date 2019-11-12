//Global Variables
var varAvShifts = 0;
var varNumMsgs = 0;

//Initialiser
function initTopBar()
{
    //Get rows from database, calculate, display
    var promise1 = HTTP_GET("numAvShifts.php").then(JSON.parse).then(numAv2).catch(handleError); //Promise String 
    var promise2 = HTTP_GET("numMsgs.php").then(JSON.parse).then(numMsgs).catch(handleError);
    Promise.all([promise1, promise2]).then(DisplayTopBar);
}

function handleError(error) //Generic error
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
function numAv2(shifts)
{

    //loop all rows
    for (var i = 0; i < shifts.length; i++)
    {
        var add1 = true; //Default state

        if (shifts[i].userID != curUserID) //Same ID (Fail)
        {
            for (var ii = 0; ii < shifts.length; ii++) //Loop all rows
            {
                if (shifts[i].Date == shifts[ii].Date && i != ii) //Same date 
                {
                    if ((shifts[ii].Start >= shifts[i].Start && shifts[ii].Start <= shifts[i].End) ||
                        (shifts[ii].End   >= shifts[i].Start && shifts[ii].End   <= shifts[i].End)) //Time overlaps (Fail)
                    {
                        add1 = false;
                    }
                }
            }
        }
        else
        {
            add1 = false;
        }
        //If passes all tests, add1 remains True, one is added to variable
        if(add1)
        {
            varAvShifts++;
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

    varTopBar.innerHTML = `Available : <b> ${varAvShifts} </b> | Messages : <b> ${varNumMsgs} </b> | Updated : <b> ${d.toLocaleTimeString()} </b>`;
}