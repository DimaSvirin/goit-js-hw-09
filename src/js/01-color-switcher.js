
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEL = document.querySelector('body');

let intervalForColor = null;
let colorStart = false;

function btnClicked(value) {
  if (value) {
    startBtn.disabled = false;
    stopBtn.disabled = true;
  } else {
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
}

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  changeColor();
  btnClicked(!true);
}

function changeColor() {
  if (colorStart) {
    return;
  }
  colorStart = true;
  intervalForColor = setInterval(() => {
    bodyEL.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  btnClicked(true);
  colorStart = false;
  clearInterval(intervalForColor);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}