var quizCorrectQ = 0;
var quizWrongQ = 0;
var quizStartAt;
var quizTimeClock;
var quizTimeClockSec = 0;

function startQuizTimeClock() {
  if (quizTimeClock) return;
  if (quizTimeClockSec == 0) {
    quizStartAt = new Date().getTime();
    document.querySelectorAll(".quizTimerClock")[0].style.display = "block";
    quizTimeClock = setInterval(function () {
      updateQuizTimeClock();
    }, 1000);
  }
}

function updateQuizTimeClock() {
  var now = new Date().getTime();
  var distance = now - quizStartAt;
  quizTimeClockMS = distance / 1000;

  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  document.getElementById("qtcMinSec").innerHTML = minutes + ":" + seconds;
}

function chkAns(resp) {
  startQuizTimeClock();
  var Qbox = resp.parentNode;

  if (!Qbox.classList.contains("Qsuccess")) {
    if (resp.classList.contains("correctAns")) {
      Qbox.classList.add("Qsuccess");
      quizCorrectQ = quizCorrectQ + 1;
    } else {
      Qbox.classList.add("Qsuccess");
      resp.classList.add("wrongAns");
      quizWrongQ = quizWrongQ + 1;
    }
  }
}

function viewAns(resp) {
  startQuizTimeClock();
  var Qbox = resp.parentNode.parentNode;
  var solBox = resp.parentNode;
  if (!Qbox.classList.contains("Qsuccess")) {
    Qbox.classList.add("Qsuccess");
  }

  if (solBox.classList.contains("hide-sol")) {
    solBox.classList.remove("hide-sol");
    solBox.classList.add("show-sol");
  } else {
    solBox.classList.remove("show-sol");
    solBox.classList.add("hide-sol");
  }
}

function quizResultGenerate() {
  clearInterval(quizTimeClock);
  //var AllQ = document.querySelectorAll('.question-block .qus-body');
  //var skipQ = AllQ.length - quizWrongQ - quizCorrectQ;

  var timeClock = document.querySelectorAll(".quizTimerClock")[0];
  timeClock.style.display = "none";

  var timeQ = timeClock.innerText;
  var accuracyQ = Math.floor(
    (quizCorrectQ * 100) / (quizWrongQ + quizCorrectQ)
  );

  var htmlElm =
    '<div class="question-block"><div class="quizResultCard" >Time : ' +
    timeQ +
    '</div> <div class="quizResultCard" >Accuracy : ' +
    accuracyQ +
    '%</div><div class="quizResultCard" >Correct Answers : ' +
    quizCorrectQ +
    '</div><div class="quizResultCard" >Wrong Answers : ' +
    quizWrongQ +
    "</div></div>";

  document.getElementById("resueltQuiz").innerHTML = htmlElm;
}
