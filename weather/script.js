function script(d, s, id) {
  if (d.getElementById(id)) return;
  const js = d.createElement(s),
        fjs = d.getElementsByTagName(s)[0];
  js.id = id;
  js.src = 'https://weatherwidget.io/js/widget.min.js';
  fjs.parentNode.insertBefore(js, fjs);
}

function getWeather(lat, lon) {
  const iframe = document.getElementById("weather");
  const url = `https://forecast7.com/en/${lat.toFixed(2)}d${lon.toFixed(2)}/your-city/`;
  iframe.setAttribute("href", url);
  iframe.setAttribute("data-label_1", "YOUR CITY");
  iframe.setAttribute("data-icons", "Climacons Animated");
  iframe.setAttribute("data-mode", "Current");
}

// THEME BASED ON SYSTEM PREFERENCE
function light() {
  document.documentElement.setAttribute('data-theme', 'pure');
  const el = document.getElementById('weather');
  el.setAttribute('data-theme', 'pure');
  el.removeAttribute('data-basecolor');
  el.setAttribute('data-textcolor', '#37352f');
  el.removeAttribute('data-cloudfill');
  el.setAttribute('data-suncolor', '#F58f70');
  script(document, 'script', 'weatherwidget-io-js');
}

function dark() {
  document.documentElement.setAttribute('data-theme', 'gray');
  const el = document.getElementById('weather');
  el.setAttribute('data-theme', 'gray');
  el.setAttribute('data-basecolor', '#191919');
  el.removeAttribute('data-textcolor');
  el.setAttribute('data-cloudfill', '#191919');
  el.setAttribute('data-suncolor', '#F58f70');
  script(document, 'script', 'weatherwidget-io-js');
}

// Apply theme once
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  dark();
} else {
  light();
}

// Watch for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  if (event.matches) {
    dark();
  } else {
    light();
  }
});

// ✅ READ lat/lon from URL
const params = new URLSearchParams(window.location.search);
const lat = parseFloat(params.get("lat")) || 53.55; // default: Hamburg
const lon = parseFloat(params.get("lon")) || 10.00;

getWeather(lat, lon);
