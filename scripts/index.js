let map = L.map('map').setView([51.505, -0.09], 13);

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

let marker = L.marker([51.5, -0.09],{icon: markerIcon}).addTo(map);
marker.bindPopup("<h2>Your location</h2>").openPopup();