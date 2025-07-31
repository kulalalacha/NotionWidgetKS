function script(d, s, id) {
  const old = d.getElementById(id);
  if (old) old.remove();

  const js = d.createElement(s),
        fjs = d.getElementsByTagName(s)[0];
  js.id = id;
  js.src = 'https://weatherwidget.io/js/widget.min.js';
  fjs.parentNode.insertBefore(js, fjs);
}

function getWeather(lat, lon, city) {
  const el = document.getElementById("weather");

  const latStr = `${Math.abs(lat).toFixed(2).replace('.', 'd')}${lat >= 0 ? 'n' : 's'}`;
  const lonStr = `${Math.abs(lon).toFixed(2).replace('.', 'd')}${lon >= 0 ? 'e' : 'w'}`;
  const url = `https://forecast7.com/en/${latStr}${lonStr}/${city.toLowerCase()}/`;

  console.log('Forecast7 URL:', url); // 🧪 Debugging

  el.setAttribute("href", url);
  el.setAttribute("data-label_1", city.toUpperCase());
  el.setAttribute("data-icons", "Climacons Animated");
  el.setAttribute("data-mode", "Current");

  setTimeout(() => {
    script(document, 'script', 'weatherwidget-io-js');
  }, 50);
}



// THEMES
function light() {
  document.documentElement.setAttribute('data-theme', 'pure');
  const el = document.getElementById('weather');
  el.setAttribute('data-theme', 'pure');
  el.removeAttribute('data-basecolor');
  el.setAttribute('data-textcolor', '#37352f');
  el.removeAttribute('data-cloudfill');
  el.setAttribute('data-suncolor', '#F58f70');
}

function dark() {
  document.documentElement.setAttribute('data-theme', 'gray');
  const el = document.getElementById('weather');
  el.setAttribute('data-theme', 'gray');
  el.setAttribute('data-basecolor', '#191919');
  el.removeAttribute('data-textcolor');
  el.setAttribute('data-cloudfill', '#191919');
  el.setAttribute('data-suncolor', '#F58f70');
}

// Apply theme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  dark();
} else {
  light();
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  if (event.matches) dark();
  else light();
});

// 🚀 Parse URL Parameters
const params = new URLSearchParams(window.location.search);
const lat = parseFloat(params.get("lat")) || 53.55;
const lon = parseFloat(params.get("lon")) || 10.00;
const city = params.get("city") || "hamburg";

getWeather(lat, lon, city);
