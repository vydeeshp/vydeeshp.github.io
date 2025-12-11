const API_URL = "https://portfolio-api-okqr.onrender.com";
const WEATHER_API_KEY = "86aa8d57f85e4aca8a1163422250312";

async function loadProfile() {
  const res = await fetch(`${API_URL}/api/profile`);
  const data = await res.json();
  document.getElementById("name").textContent = data.data.name;
  document.getElementById("roll").textContent = data.data.roll;
  document.getElementById("about").textContent = data.data.about;
  document.getElementById("email").textContent = data.data.email;
}

async function loadList(endpoint, elementId) {
  const res = await fetch(`${API_URL}/${endpoint}`);
  const data = await res.json();
  const element = document.getElementById(elementId);
  element.innerHTML = "";
  const items = data.hobbies || data.skills || data.aspirations;
  items.forEach(i => {
    const li = document.createElement("li");
    li.textContent = i;
    element.appendChild(li);
  });
}

loadProfile();
loadList("api/hobbies", "hobby-list");
loadList("api/aspirations", "aspiration-list");
loadList("api/skills", "skills-list");

// ---------------- Weather ----------------
async function getWeather(location=null){
  const city = location || document.getElementById("city").value;
  if(!city) return alert("Enter a city name!");
  const url=`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}`;
  const res = await fetch(url);
  const data = await res.json();
  document.getElementById("weather-result").innerHTML = `🌡 ${data.current.temp_c}°C | ${data.current.condition.text}`;
}

// Auto location
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(pos=>{
    getWeather(`${pos.coords.latitude},${pos.coords.longitude}`);
  });
}

// ---------------- Map ----------------
const map = L.map('map').setView([12.9716, 77.5946], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker([12.9716,77.5946]).addTo(map).bindPopup("My Location");

// ---------------- Scroll Animation ----------------
const sections=document.querySelectorAll(".container");
window.addEventListener("scroll",()=>{
  sections.forEach(sec=>{
    const pos=sec.getBoundingClientRect();
    pos.top < window.innerHeight - 100
      ? sec.classList.add("visible")
      : sec.classList.remove("visible");
  });
});

// ---------------- Dark Mode ----------------
document.getElementById("darkModeBtn").onclick=()=>{
  document.body.classList.toggle("dark");
};

