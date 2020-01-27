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
  var trainName = $("#train-name").trim().val();
  var trainDestination = $("#train-destination").trim().val();
  var firstTrainTime = $("#train-time").trim().val();
  var trainFrequency = $("#train-frequency").trim().val();


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
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

$(document).ready(function(){
    startTime();
    // code to show forms on button clicks
    $("#add-entry-btn").on("click", function(){
        $("#add-entry-form").css({visibility: ""});
        $("#control-panel-container").hide();
    })

    // code to hide forms on "finished" button clicks
    $("#adding-finished-btn").on("click", function(){
        $("#add-entry-form").css({visibility: "hidden"});
        $("#control-panel-container").show();
    })
})