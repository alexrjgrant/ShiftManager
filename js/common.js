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

function dayOfWeek(varDate)
{
    var d = new Date(Date.parse(varDate));
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[d.getDay()];
}

function countRows()
{
    return document.querySelectorAll('#rw').length;
}