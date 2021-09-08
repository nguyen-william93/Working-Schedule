var saveData = function(task, hour){
    var userData = JSON.parse(localStorage.getItem("schedule")) || []

    if (task !== ""){
        userObj = {
            task: task,
            hour: hour
        }
        userData.push(userObj);
        window.localStorage.setItem("schedule", JSON.stringify(userData))
    }
};

var loadData = function(){
    var tasks = JSON.parse(localStorage.getItem("schedule"));

    //looping over each object in the list
    $.each(tasks, function(list, arr){
        displaySavedTask(arr.task, arr.hour);
    })
};

var displaySavedTask = function(task, hour){
    var task = task;
    $(".hour").each(function(){
        if($(this).text() === hour){
            $(this).siblings("textarea").text(task);
        } else {
            $(this).siblings("textarea").text();
        }
    })
};

//continuously checking the time against our time block
var checkTime = function(){
    var currentTime = moment().hour(); //using momemt.js to obtain military time.
    $("div .hour").each(function(){
        var timeBlock = parseInt($(this).attr("id"));
        if (currentTime > timeBlock){
            $(this).siblings("textarea").addClass("past");
        } else if (currentTime < timeBlock){
            $(this).siblings("textarea").addClass("future");
        } else {
            $(this).siblings("textarea").addClass("present");
        }
    })
}

//calling function to run the opage
$(document).ready(function(){

    //using momemt to get current time and day
    //interval to update current time every second
    $("#currentDay").text(moment().format("MMMM DD YYYY, h:mm:ss a")); 
    var interval = setInterval(function(){
        $("#currentDay").text(moment().format("MMMM DD YYYY, h:mm:ss a")); 
        console.log("1");
    }, 1000);

    //check the time and add the correct color and display the screen base on any saved data
    checkTime();
    loadData();

    //save to local data when button is clicked
    $(".saveBtn").on("click", function(){
        var userInput = $(this).siblings("textarea").val().trim();
        var hourSpan = $(this).siblings(".hour").text().trim();
        saveData(userInput, hourSpan)
    })

    //clear the local data and refresh the page
    $("#clear-task").on("click", function(){
        localStorage.clear();
        location.reload();
    })
});


