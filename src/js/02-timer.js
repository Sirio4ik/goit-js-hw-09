import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');
const timeInput = document.querySelector('#datetime-picker');

document.body.classList.add('body', 'body--timer');

let timerStarted = false;
startButton.disabled = true;

startButton.addEventListener('click', startTimer);

const flatpicker = flatpickr(timeInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(date) {
    const difference = date[0].getTime() - new Date().getTime();
    if (timerStarted) {
      Notiflix.Notify.failure('The timer is already started');
    } else {
      if (difference < 0) {
        Notiflix.Notify.failure('Please choose a date in the future');
      } else {
        startButton.disabled = false;
      }
    }
  },
});

function startTimer() {
  timerStarted = true;
  startButton.disabled = true;
  let currentTime =
    flatpicker.selectedDates[0].getTime() - new Date().getTime();
  renderTimer(convertMs(currentTime));
  const timeInterval = setInterval(() => {
    if (currentTime >= 1000) {
      currentTime -= 1000;
      renderTimer(convertMs(currentTime));
    } else {
      Notiflix.Notify.success(`The time is up!`);
      clearInterval(timeInterval);
      timerStarted = false;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function renderTimer(time) {
  days.textContent = time.days.toString().padStart(2, '0');
  hours.textContent = time.hours.toString().padStart(2, '0');
  minutes.textContent = time.minutes.toString().padStart(2, '0');
  seconds.textContent = time.seconds.toString().padStart(2, '0');
}
