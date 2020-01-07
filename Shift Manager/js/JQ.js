function filterJQ() {
    
    $(function () {
        // jQuery methods go here...

        $("#filterDiv").click(function () {
            if ($("#closeFilter").css("display") == "none") {
                $("#filterDiv").animate({ width: "450px", height: "240px" }, { duration: 200, queue: false });
                $("#formFilter").slideDown(200);
                $("#closeFilter").slideDown(200);
            }
        });
        $("#closeFilter").click(function () {
            $("#filterDiv").animate({ width: "150px", height: "35px" }, { duration: 200, queue: false });
            $("#formFilter").slideUp(200);
            $("#closeFilter").slideUp(200);
        });

        $("#SEARCH").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#tb tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
}