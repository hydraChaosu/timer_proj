let time = 0;
let interval;
let isTimerStarted = false;
let isEditing = true;
const timeHour = document.getElementById("hours");
const timeMinutes = document.getElementById("minutes");
const timeSeconds = document.getElementById("seconds");
const editTime = document.getElementById("editTime");
const stopStartTime = document.getElementById("stopTime");
const editTimeView = document.querySelector("#editTime i");
const stopStartTimeView = document.querySelector("#stopTime i");
const restartTime = document.getElementById("restartTime");
const alarm = document.getElementById("alarm");
const alarmBtn = document.getElementById("alarm--btn");

const classEdit = "fas fa-edit";
const classCheck = "fas fa-check";
const classPlay = "fas fa-play";
const classStop = "fas fa-stop";

const setTimerTime = () => {
  time =
    Number(timeHour.value) * 3600 +
    Number(timeMinutes.value) * 60 +
    Number(timeSeconds.value);
};

const countTime = () => {
  time -= 1;
  const hour = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = time % 60;
  setTimeView(hour, timeHour);
  setTimeView(minutes, timeMinutes);
  setTimeView(seconds, timeSeconds);
  if (Number(time) <= 0) {
    clearInterval(interval);
    alarm.play();
    alarmBtn.classList.toggle("none");
    return;
  }
};

const setTimeView = (time, element) => {
  element.value = time > 10 ? time : `0${time}`;
};

const startTimer = () => {
  interval = setInterval(countTime, 1000);
};

const toggleInputs = (val) => {
  timeHour.disabled = val;
  timeMinutes.disabled = val;
  timeSeconds.disabled = val;
};

stopStartTime.addEventListener("click", () => {
  if (isTimerStarted) {
    clearInterval(interval);
    toggleInputs(true);
    stopStartTimeView.className = classPlay;
    isTimerStarted = false;
    return;
  }
  startTimer();
  toggleInputs(true);
  stopStartTimeView.className = classStop;
  isTimerStarted = true;
});

editTime.addEventListener("click", () => {
  clearInterval(interval);
  if (isEditing) {
    toggleInputs(true);
    setTimerTime();
    startTimer();
    isTimerStarted = true;
    stopStartTime.disabled = false;
    editTimeView.className = classEdit;
    isEditing = false;
    stopStartTimeView.className = classStop;
    return;
  }
  toggleInputs(false);
  stopStartTime.disabled = true;
  editTimeView.className = classCheck;
  stopStartTimeView.className = classPlay;
  isEditing = true;
  isTimerStarted = false;
});

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && isEditing) {
    toggleInputs(false);
    setTimerTime();
    startTimer();
    isTimerStarted = true;
    stopStartTime.disabled = false;
    stopStartTimeView.className = classPlay;
    editTimeView.className = classEdit;
    stopStartTimeView.className = classStop;

    isEditing = false;
  }
});

restartTime.addEventListener("click", () => {
  if (isTimerStarted) toggleInputs();
  clearInterval(interval);
  timeHour.value = "00";
  timeMinutes.value = "00";
  timeSeconds.value = "00";
  stopStartTime.disabled = false;
  editTimeView.className = classEdit;
  stopStartTimeView.className = classPlay;
  isTimerStarted = false;
});

alarmBtn.addEventListener("click", () => {
  alarmBtn.classList.toggle("none");
  toggleInputs(false);
  alarm.pause();
  time = 0;
  interval;
  isTimerStarted = false;
  isEditing = true;
});
