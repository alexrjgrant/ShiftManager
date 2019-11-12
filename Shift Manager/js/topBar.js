var varAvShifts = 0;
var varNumMsgs = 0;

function initTopBar() {
    //HTTP_GET("test.php?search=0").then(JSON.parse).then(display).catch(handleError); //Promise String  

    var p1 = HTTP_GET("numAvShifts.php").then(JSON.parse).then(numAv2).catch(handleError); //Promise String 
    var p2 = HTTP_GET("numMsgs.php").then(JSON.parse).then(numMsgs).catch(handleError);

    Promise.all([p1, p2]).then(display3);

    
}
function handleError(error) {

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
function numAv2(shifts) {
    var varAccepted = true;
    //Check for clashing shifts
    l1: for (var i = 0; i < shifts.length; i++) {

        console.log("User ID - " + shifts[i].userID + " : " + curUserID);

        if (shifts[i].userID == curUserID) //same ID
        {
            console.log("User Clash");
            continue l1;
        }
        
        l2: for (var ii = 0; ii < shifts.length; ii++) 
        {
            
            console.log("Shift ID - " + i + " : " + ii);
          
            if(i == ii)
            {
                console.log("SAME SHIFT");

                if(ii == shifts.length -1) 
                { 
                    varAccepted = false; 
                    console.log("END"); 
                }
                else
                {
                    console.log("NEXT");
                    console.log("------------------------");
                }
            
                continue l2;
            }

            console.log(shifts[i].Date + " " + shifts[ii].Date);

            if (shifts[i].Date == shifts[ii].Date) //same date  CHANGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            {
                
                console.log("DATE CLASH");

                console.log(shifts[i].Start + " " + shifts[i].End);
                console.log(shifts[ii].Start + " " + shifts[ii].End);

                if((shifts[ii].Start >= shifts[i].Start && shifts[ii].Start <= shifts[i].End) || (shifts[ii].End >= shifts[i].Start && shifts[ii].End <= shifts[i].End))
                {
                    console.log("TIME CLASH");
                    console.log("FAIL");
                    console.log("*****************************************");
                    
                    continue l1;
                }

            }
            console.log("NEXT");
            console.log("------------------------");
        }
        
        if(varAccepted)
        {
        console.log("PASS");

        console.log("--------------------------------------------");
        ////////PRINT SHIFTS////////
        varAvShifts++;
        }
    }

}
function numMsgs(shifts) {
    varNumMsgs = shifts.length;
}
function display3(shifts) {

    document.getElementById("t").innerHTML = "Available : <b>" + varAvShifts + "</b> | Messages : <b>" + varNumMsgs + "</b>";
    var d = new Date();
    document.getElementById("t").innerHTML += " | Updated : " + "<b>" + d.toLocaleTimeString() + "</b>";
}



