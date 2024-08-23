// console.log(document.querySelector(".location-text"))

async function getLocationInfo(ipOrDomain) {
    const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_vKrhv4x0tDg8IstjF1nmZxDUdVuZY&ipAddress=${ipOrDomain}&domain=${ipOrDomain}`

    const response = await fetch(apiUrl);
    const result = await response.json();
    console.log(result)

    const location = result.location;

    displayLocationInfo(result);
    getLocationOnMap(location);
}

getLocationInfo("");


const formElement = document.querySelector(".form");

formElement.addEventListener("submit", (e)=> {
    e.preventDefault();
    const searchText = document.querySelector(".form__input").value;
    getLocationInfo(searchText);
})

// async function getLocationInfo(ipOrDomain) {
//     const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_vKrhv4x0tDg8IstjF1nmZxDUdVuZY&ipAddress=${ipOrDomain}&domain=${ipOrDomain}`

//     const response = await fetch(apiUrl);
//     const result = await response.json();
//     console.log(result)

//     const location = result.location;

//     displayLocationInfo(result);
//     getLocationOnMap(location);
// }

function displayLocationInfo (userInfo){
    const location = userInfo.location;

    document.querySelector(".ip-text").textContent = userInfo.ip; 
    document.querySelector(".location-text").textContent = `${location.city}, ${location.country} ${location.geonameId}`; 
    document.querySelector(".timezone-text").textContent = `UTC ${location.timezone}`; 
    document.querySelector(".isp-text").textContent = userInfo.isp; 
}

function getLocationOnMap(location){
    let map = L.map('map').setView([location.lat, location.lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let markerIcon = L.icon({
        iconUrl: '../images/icon-location.svg',
        iconSize:     [23, 28], // size of the icon
        iconAnchor:   [22, 28], // point of the icon which will correspond to marker's location
        popupAnchor:  [-10, -28] // point from which the popup should open relative to the iconAnchor
    });

    let marker = L.marker([location.lat, location.lng],{icon: markerIcon}).addTo(map);
    marker.bindPopup("<h2>Your location</h2>").openPopup();
}
