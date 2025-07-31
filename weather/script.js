function script(d, s, id) {
  // โหลด widget script ใหม่ หลังจากแก้ href/data
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
  const latStr = lat.toFixed(2).replace('.', '');
  const lonStr = lon.toFixed(2).replace('.', '');
  const url = `https://forecast7.com/en/${latStr}d${lonStr}/${city.toLowerCase()}/`;

  el.setAttribute("href", url);
  el.setAttribute("data-label_1", city.toUpperCase());
  el.setAttribute("data-icons", "Climacons Animated");
  el.setAttribute("data-mode", "Current");

  setTimeout(() => {
    script(document, 'script', 'weatherwidget-io-js');
  }, 50);
}


// Theme
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

// Theme init
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  dark();
} else {
  light();
}

// Watch theme change
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  if (event.matches) {
    dark();
  } else {
    light();
  }
});

// Get lat/lon from URL
const params = new URLSearchParams(window.location.search);
const rawLat = parseFloat(params.get("lat"));
const rawLon = parseFloat(params.get("lon"));
const lat = !isNaN(rawLat) ? rawLat : 53.55;
const lon = !isNaN(rawLon) ? rawLon : 10.00;
const city = params.get("city") || "hamburg";

getWeather(lat, lon, city);

