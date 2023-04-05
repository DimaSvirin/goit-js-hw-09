// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const elDay = document.querySelector('[data-days]');
const elHour = document.querySelector('[data-hours]');
const elMinute = document.querySelector('[data-minutes]');
const elSecond = document.querySelector('[data-seconds]');
const divEl = document.querySelector('.timer');



divEl.style.cssText =
  'font-size: 40px; font-weight: bolder;';

const startDate = Date.now();
let futereDate = 0;

startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startBtn.removeAttribute('disabled');
    futereDate = selectedDates[0].getTime();
    if (futereDate < startDate) {
      startBtn.setAttribute('disabled', 'true');

      Notiflix.Notify.init({
        position: 'center-top',
      });
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(inputEl, options);

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  startBtn.setAttribute('disabled', 'true');
  
  const timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = futereDate - currentTime;
    
    if (deltaTime < 900) {
      
      startBtn.setAttribute('disabled', 'true');
      clearInterval(timerId);
    }
    const textTime = convertMs(deltaTime);
    elSecond.textContent = textTime.seconds;
    elMinute.textContent = textTime.minutes;
    elHour.textContent = textTime.hours;
    elDay.textContent = textTime.days;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
