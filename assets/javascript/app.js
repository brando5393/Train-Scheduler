// ===APP JS FILE===

// firebase connecting code
var firebaseConfig = {
    apiKey: "AIzaSyBjpTyusyljyqkFl_BvuIXAVhhpEgbJ_x4",
    authDomain: "bootcamp-train-scheduler.firebaseapp.com",
    databaseURL: "https://bootcamp-train-scheduler.firebaseio.com",
    projectId: "bootcamp-train-scheduler",
    storageBucket: "bootcamp-train-scheduler.appspot.com",
    messagingSenderId: "689625399475",
    appId: "1:689625399475:web:73e77b640c081af719b0c6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// global vars
var database = firebase.database();


// code to display the current time
// taken from: https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
function startTime() {
    // sets the js date object to the today var 
    var today = new Date();
    // sets the hours portion of the date obj to the var h
    var h = today.getHours();
    // sets the minutes portion of the date obj to the var m
    var m = today.getMinutes();
    // sets the seconds portion of the date obj to the var s
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    // Line edited to use jquery
    $('#current-time-container').text(h + ":" + m + ":" + s);
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

$(document).ready(function () {
    startTime();
    // code to show forms on button clicks
    $("#add-entry-btn").on("click", function () {
        $("#add-entry-form").css({
            visibility: ""
        });
        $("#control-panel-container").hide();
    })

    // code to hide forms on "finished" button clicks
    $("#adding-finished-btn").on("click", function () {
        $("#add-entry-form").css({
            visibility: "hidden"
        });
        $("#control-panel-container").show();
    })

    // add train submit code
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();
        // grab user input
        var trainName = $("#train-name").val().trim();
        var trainDestination = $("#train-destination").val().trim();
        var firstTrainTime = $("#train-time").val().trim();
        var trainFrequency = $("#train-frequency").val().trim();

        // create temp obj for holding train data
        var trainData = {
            name: trainName,
            destination: trainDestination,
            time: firstTrainTime,
            frequency: trainFrequency
        }
        // upload trainData to db
        database.ref().push(trainData);
        // trainData console logs
        console.log(trainData.name);
        console.log(trainData.destination);
        console.log(trainData.time);
        console.log(trainData.frequency);
        console.log("train added");
        // Clears all of the text-boxes
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-time").val("");
        $("#train-frequency").val("");

    })
})
// add train data to db
database.ref().on("child_added", function (childsnapshot) {
    console.log(childsnapshot.val());
    // store new db data in vars
    var entryKey = childsnapshot.key;
    var loggedTrainName = childsnapshot.val().name;
    var loggedTrainDestination = childsnapshot.val().destination;
    var loggedTrainTime = childsnapshot.val().time;
    var loggedTrainFrequency = childsnapshot.val().frequency;
    // console log above vars
    console.log(loggedTrainName);
    console.log(loggedTrainDestination);
    console.log(loggedTrainTime);
    console.log(loggedTrainFrequency);
    // place moment js code below

    // var for new table row
    var newTrainTableRow = $("<tr>").append(
        $("<td>").text(entryKey),
        $("<td>").text(loggedTrainName),
        $("<td>").text(loggedTrainDestination),
        $("<td>").text(loggedTrainFrequency)
        // next train time
        // min away
    );
    // append row to table
    $("#train-schedule-table").append(newTrainTableRow);
})