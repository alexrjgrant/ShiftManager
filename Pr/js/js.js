var f;
function allShiftsInit()
{    
    
    
    
    
    
    
    
    var queryString = new URLSearchParams(new FormData(document.getElementById("frm"))).toString();
    
//        HTTP_GET("https://edward2.solent.ac.uk/~agrant/Pr/wsShifts.php?all=1").then(JSON.parse).then(displayAllShifts).catch(handleError); //Promise String
     HTTP_GET("https://edward2.solent.ac.uk/~agrant/Pr/wsShifts.php?all=1&"+queryString).then(JSON.parse).then(displayAllShifts).catch(handleError); //Promise String   
    
    f=0;
    document.getElementById("s").addEventListener("click", function(){
        removeItem("ErrorMsg");
    var queryString = new URLSearchParams(new FormData(document.getElementById("frm"))).toString();
        
        document.getElementById("main_heading").innerHTML = queryString;
        
     HTTP_GET("https://edward2.solent.ac.uk/~agrant/Pr/wsShifts.php?all=1&"+queryString).then(JSON.parse).then(displayAllShifts).catch(handleError); //Promise String   
    
    });
    
    
  

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  document.getElementById('myModal').style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == document.getElementById('myModal')) {
    document.getElementById('myModal').style.display = "none";
  }
}
    
    
    
    
    
    
}
function avShiftsInit()
{    
        HTTP_GET("https://edward2.solent.ac.uk/~agrant/Pr/wsShifts.php?all=0").then(JSON.parse).then(displayShifts).catch(handleError); //Promise String
    f=1;
}
function curShiftInit()
{
    pt = (7.83*1.171)/60/60/1000
    m = 0;
     var d = new Date();
  var n = d.getTime();
    
    
     document.getElementById("main_heading").innerHTML = 
    
         
         
         
         
         
         
         
         
    HTTP_GET("https://edward2.solent.ac.uk/~agrant/Pr/wsShifts.php?SU=1").then(JSON.parse).then(displayCurShifts).catch(handleError); //Promise String
}
function msgsInit()
{
     HTTP_GET("https://edward2.solent.ac.uk/~agrant/Pr/wsGetMsg.php").then(JSON.parse).then(displayMsgs).catch(handleError); //Promise String
}
function handleError(error)
{    
    removeItem("ErrorMsg");
    
    var Err = document.getElementById("error");

    var message = "";
    
    var p = document.createElement("P");
    p.setAttribute("id", "ErrorMsg");
    
 
   
    if(error == 400)
    {
        message = "Error - Check if shift is still available";
    }
    if(error == 404)
    { 
        message = "No Results Found";
    }
     if(error == 414)
    {
        message = "Error (Length Exceeded) - Edit Search Term And Try Again";
    }
    if(error == 405)
    {
        message = "Error (Wrong Method) - Search Using GET Method Only";
    }
    
    var m = document.createTextNode(message);
    p.appendChild(m);
    document.getElementById("returndiv").appendChild(p);
}


function HTTP_GET(url) 
{
    var p = new Promise((resolve,reject)=>
            { 
                var XHR = new XMLHttpRequest();
                XHR.open('GET', url);
        
                XHR.addEventListener("load", (e)=> 
                {              
                    if(e.target.status>=400 && e.target.status<=599)
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

function HTTP_POST(URL,ID,MODE) 
{
    var p = new Promise((resolve,reject)=>
            { 
                var XHR = new XMLHttpRequest();
       
                XHR.open('POST', URL, true);
                XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                XHR.addEventListener("load", (e)=> 
                {              
                    if(e.target.status>=400 && e.target.status<=599)
                    {
                        reject(e.target.status); 
                    } 
                    else 
                    {
                        resolve(e.target.responseText);
                    }
                });
                XHR.send("shiftID="+ID+"&mode="+MODE);
            });
    return p;
}

function displayAllShifts(shifts)
{  
    removeItem("table");
    var t  = document.createElement("TABLE");
    t.setAttribute("id", "table");
    
    var tr = document.createElement("TR");
            
    ["Shift ID","Date", "Start Time", "Finish Time", "Supervisor?","Staff Member"].forEach ( heading => 
    {
        var th = document.createElement("TH");
        var textNode = document.createTextNode(heading);
        th.appendChild(textNode);
        tr.appendChild(th);
    });

    t.appendChild(tr);

    shifts.forEach( curShift => 
    {
        var tr2 = document.createElement("TR");
        
        tr2.setAttribute("id", "rw");
        tr2.setAttribute("class", curShift.id);
        
        var varSID = curShift.ShiftID;
        var varDate  = curShift.Date;
        var varStart = curShift.Start;
        var varEnd = curShift.End;
        var varUID = curShift.Firstname + " " + curShift.Surname;
        var varS = "No";
        if(curShift.Supervisor == 1)
        {
            varS = "Yes"
        }
        
        


        [varSID,varDate,varStart,varEnd,varS,varUID].forEach ( data => 
        {
            var td = document.createElement("TD");
            var textNode2 = document.createTextNode(data);
            td.appendChild(textNode2);
            tr2.appendChild(td);


        });
        
        if(f=1)
        {
            tr2.addEventListener("click",()=>
            {            
                document.getElementById('myModal').style.display = "block";
                
                document.getElementById("edit").addEventListener("click",()=>
                {
                    document.getElementById("main_heading").innerHTML = varSID;
                    //edit Function
                    //trans to form. 
                    
                    
                    
                    
                });
                document.getElementById("delete").addEventListener("click",()=>
                {
                   if (confirm(`Are you sure? Once deleted, the shift cannot be recovered\n\n DATE : ${varDate} \n TIME : ${varStart} - ${varEnd} `))
                    {           HTTP_POST("https://edward2.solent.ac.uk/~agrant/Pr/wsDelete.php",varSID," ").then(JSON.parse).then(displayMsgs).catch(handleError); //Promise String 
                    }
                    
                 
                    
                });
            });
            
            
        }
        t.appendChild(tr2);

    });
    
        document.getElementById("returndiv").appendChild(t);
  

}

function displayShifts(shifts)
{  
    
    var t  = document.createElement("TABLE");
    t.setAttribute("id", "table");
    
    var tr = document.createElement("TR");
            
    ["Shift ID","Date", "Start Time", "Finish Time", "Supervisor?","User"].forEach ( heading => 
    {
        var th = document.createElement("TH");
        var textNode = document.createTextNode(heading);
        th.appendChild(textNode);
        tr.appendChild(th);
    });

    t.appendChild(tr);

    shifts.forEach( curShift => 
    {
        var tr2 = document.createElement("TR");
        
        tr2.setAttribute("id", "rw");
        tr2.setAttribute("class", curShift.id);
        
        var varSID = curShift.ShiftID;
        var varDate  = curShift.Date;
        var varStart = curShift.Start;
        var varEnd = curShift.End;
        var varUID = curShift.userID;
        var varS = "No";
        if(curShift.Supervisor == 1)
        {
            varS = "Yes";
        }
        
        


        [varSID,varDate,varStart,varEnd,varS,varUID].forEach ( data => 
        {
            var td = document.createElement("TD");
            var textNode2 = document.createTextNode(data);
            td.appendChild(textNode2);
            tr2.appendChild(td);


        });
        
       
            tr2.addEventListener("click",()=>
            {            


                if (confirm(`Are you sure? Once accepted, the shift becomes your responcibillity to atend or find cover\n\n DATE : ${varDate} \n TIME : ${varStart} - ${varEnd} `)) 
                {

                 
                    HTTP_POST("https://edward2.solent.ac.uk/~agrant/Pr/wsClaimShift.php",curShift.ShiftID,"accept").then(JSON.parse).catch(handleError); 

                    HTTP_GET("https://edward2.solent.ac.uk/~agrant/Pr/wsShifts.php?all=0").then(JSON.parse).then(displayShifts).catch(handleError); //Promise String   
                }


            });
        
        t.appendChild(tr2);

    });
    
        document.getElementById("returndiv").appendChild(t);
  

}

function displayCurShifts(shifts)
{  
    removeItem("table");
    var t  = document.createElement("TABLE");
    t.setAttribute("id", "table");
    
    var tr = document.createElement("TR");
            
    ["Shift ID","Date", "Start Time", "Finish Time"].forEach ( heading => 
    {
        var th = document.createElement("TH");
        var textNode = document.createTextNode(heading);
        th.appendChild(textNode);
        tr.appendChild(th);
    });

    t.appendChild(tr);

    shifts.forEach( curShift => 
    {
        var tr2 = document.createElement("TR");
        
        tr2.setAttribute("id", "rw");
        tr2.setAttribute("class", curShift.id);
        
        var varSID = curShift.ShiftID;
        var varDate  = curShift.Date;
        var varStart = curShift.Start;
        var varEnd = curShift.End;   
        var varAv = curShift.Available;
        
        if(varAv == 1){tr2.style.backgroundColor = "orange";}
        

        [varSID,varDate,varStart,varEnd].forEach ( data => 
        {
            var td = document.createElement("TD");
            var textNode2 = document.createTextNode(data);
            td.appendChild(textNode2);
            tr2.appendChild(td);
            
        

        });
       
        if(varAv == 1)
        {
            tr2.addEventListener("click",()=>
            {            


                if (confirm(`Are you sure you want to re-confirm this shift?  \n\n DATE : ${varDate} \n TIME : ${varStart} - ${varEnd} `)) 
                {
                    removeItem("table");
                    HTTP_POST("https://edward2.solent.ac.uk/~agrant/Pr/wsClaimShift.php?",curShift.ShiftID,"accept").then(JSON.parse).catch(handleError);
                    
                     HTTP_GET("https://edward2.solent.ac.uk/~agrant/Pr/wsShifts.php?SU=1").then(JSON.parse).then(displayCurShifts).catch(handleError); //Promise String
                    
                }


            });
        }
        else if(varAv == 0)
        {
            tr2.addEventListener("click",()=>
            {            

                if (confirm(`Are you sure? You are still responcible for this shift until it has been acepted \n\n DATE : ${varDate} \n TIME : ${varStart} - ${varEnd} `)) 
                {
                    removeItem("table");
                    HTTP_POST("https://edward2.solent.ac.uk/~agrant/Pr/wsClaimShift.php?",curShift.ShiftID,"swap").then(JSON.parse).catch(handleError);
                    
                     HTTP_GET("https://edward2.solent.ac.uk/~agrant/Pr/wsShifts.php?SU=1").then(JSON.parse).then(displayCurShifts).catch(handleError); //Promise String
                    
                }


            });
        }
        t.appendChild(tr2);

    });
    
        document.getElementById("returndiv").appendChild(t);
  

}
    
function displayMsgs(msgs)
{
    removeItem("table");
    var t  = document.createElement("TABLE");
    t.setAttribute("id", "table");
    
    var tr = document.createElement("TR");
            
    ["Sender","Date","Message"].forEach ( heading => 
    {
        var th = document.createElement("TH");
        var textNode = document.createTextNode(heading);
        th.appendChild(textNode);
        tr.appendChild(th);
    });

    t.appendChild(tr);

    msgs.forEach( curMsg => 
    {
       
        var tr2 = document.createElement("TR");
        
               
        var varSenderID = curMsg.SenderID;
        var varDate = curMsg.Date;
        var varMsg = curMsg.Message;
        
        
        [varSenderID,varDate,varMsg].forEach ( data => 
        {
            var td = document.createElement("TD");
            var textNode2 = document.createTextNode(data);
            td.appendChild(textNode2);
            tr2.appendChild(td);
        });
            
        
        t.appendChild(tr2);
  
    });
    document.getElementById("returndiv").appendChild(t);
    
}

function removeItem(I)
{
    if(document.getElementById(I))
        {
            var element = document.getElementById(I);
            element.parentNode.removeChild(element);
        }
}



