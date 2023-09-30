const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let changeColorInterval;

document.body.classList.add('body', 'body--colorswitcher');
stopButton.disabled = true;

startButton.addEventListener('click', startChanges);
stopButton.addEventListener('click', stopChanges);

function startChanges() {
  startButton.disabled = true;
  stopButton.disabled = false;
  setRandomBodyColor();
  changeColorInterval = setInterval(setRandomBodyColor, 1000);
}

function stopChanges() {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(changeColorInterval);
}

function setRandomBodyColor() {
  const hexColor = getRandomHexColor();
  document.body.style.backgroundColor = hexColor;
  const hslColor = hexToHSL(hexColor);
  changeBackToMainLinkColor(hslColor);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// КОД НИЖЧЕ ДО ДОМАШКИ НЕ ВIДНОСИТЬСЯ
// МЕНI БУЛО ЦIКАВО, ЧИ МОЖНА ВIДСТЕЖИТИ КОЛIР ФОНУ ( ТЕМНИЙ ВIН, ЧИ СВIТЛИЙ )
// ЩОБ ЗМIНИТИ КОЛIР ПОСИЛАННЯ НА ГОЛОВНУ СТОРIНКУ, ЯКЕ ГУБИЛОСЬ НА ТЕМНОМУ ФОНI

const backToMainLink = document.body.querySelector('a');

function hexToHSL(H) {
  // Конвертую з HEX в RGB
  let r = 0,
    g = 0,
    b = 0;
  if (H.length === 4) {
    r = '0x' + H[1] + H[1];
    g = '0x' + H[2] + H[2];
    b = '0x' + H[3] + H[3];
  } else if (H.length === 7) {
    r = '0x' + H[1] + H[2];
    g = '0x' + H[3] + H[4];
    b = '0x' + H[5] + H[6];
  }
  // Конвертую з RGB в HSL
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h, s, l];
}

function changeBackToMainLinkColor(color) {
  if (
    (color[0] < 0.55 && color[2] >= 0.5) ||
    (color[0] >= 0.55 && color[2] >= 0.75)
  ) {
    backToMainLink.style.color = '#212121';
    backToMainLink.style.borderBottom = '1px solid #212121';
    return;
  }
  backToMainLink.style.color = '#ffffff';
  backToMainLink.style.borderBottom = '1px solid #ffffff';
}
