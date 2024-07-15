let startTime = 0;
let currentTime = 0;
let paused = true;
let lapTimes = [];

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');
const lapList = document.getElementById('lap-list');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapTime);

function startStopwatch() {
  startTime = new Date().getTime();
  paused = false;
  startButton.disabled = true;
  pauseButton.disabled = false;
  updateTimer();
}

function pauseStopwatch() {
  paused = true;
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function resetStopwatch() {
  startTime = 0;
  currentTime = 0;
  paused = true;
  lapTimes = [];
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  lapList.innerHTML = '';
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function lapTime() {
  const lapTime = formatTime(currentTime);
  lapTimes.push(lapTime);
  const lapListItem = document.createElement('li');
  lapListItem.textContent = lapTime;
  lapList.appendChild(lapListItem);
}

function updateTimer() {
  if (!paused) {
    currentTime = new Date().getTime() - startTime;
    const hours = Math.floor(currentTime / 3600000);
    const minutes = Math.floor((currentTime % 3600000) / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    hoursElement.textContent = pad(hours);
    minutesElement.textContent = pad(minutes);
    secondsElement.textContent = pad(seconds);
    setTimeout(updateTimer, 1000);
  }
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return (number < 10 ? '0' : '') + number;
}