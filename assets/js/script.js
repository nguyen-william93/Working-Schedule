
var saveData = function(task, hour){
    //load pre-existing data;
    var userData = JSON.parse(localStorage.getItem("schedule")) || []
    if (task !== ""){
        userObj = {
            task: task,
            hour: hour
        }
        userData.push(userObj);
        window.localStorage.setItem("schedule", JSON.stringify(userData))
    }
    
}

var loadData = function(){
    var tasks = JSON.parse(localStorage.getItem("schedule"));

    //looping over each time zone
    $.each(tasks, function(list, arr){
        displaySavedTask(arr.task, arr.hour);
    })
};

var displaySavedTask = function(task, hour){
    var task = task;
    $(".hour").each(function(){
        if($(this).text() === hour){
            $(this).siblings("textarea").text(task);
        }
    })
}

//running the function on the page
//set interval to update the clock every second
//load the any save data
//logic for the save icon/button
$(document).ready(function(){
    var interval = setInterval(function(){
        $("#currentDay").text(moment().format("MMMM DD YYYY, h:mm:ss a"));
    },1000);

    loadData();

    $(".saveBtn").on("click", function(){
        var userInput = $(this).siblings("textarea").val().trim();
        var hourSpan = $(this).siblings(".hour").text().trim();
        saveData(userInput, hourSpan)
    })
})


