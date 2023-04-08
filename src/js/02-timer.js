// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const elDay = document.querySelector('[data-days]');
const elHour = document.querySelector('[data-hours]');
const elMinute = document.querySelector('[data-minutes]');
const elSecond = document.querySelector('[data-seconds]');
const divEl = document.querySelector('.timer');

divEl.style.cssText = 'font-size: 40px; font-weight: bolder;';

startBtn.addEventListener('click', handleTimerStart)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    const selectedDate = selectedDates;
    if (selectedDate.getTime() < Date.now()) {
      Notiflix.Notify.init({
        position: 'center-top',
      });
      Notiflix.Notify.info('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

let timerId = null;
let timeLeft = null;

function handleTimerStart() {
  timerUpdate();
  if (timeLeft <= 0) {
    return;
  }
  timerId = setInterval(() => {
    timerUpdate();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      return;
    }
    updateTimerDisplay(timeLeft);
  }, 1000);
}

function timerUpdate() {
  const selectedDate = new Date([inputEl.value]).getTime();
  timeLeft = selectedDate - Date.now();
  return timeLeft;
}

function updateTimerDisplay(timeLeft) {
  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  elDay.textContent = addLeadingZero(days);
  elHour.textContent = addLeadingZero(hours);
  elMinute.textContent = addLeadingZero(minutes);
  elSecond.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
