let watchId = null;
document.addEventListener('DOMContentLoaded', getMyLocation)

function getMyLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    }
    else {
        alert("Oops, no geolocation support")
    }
}

var ourCoords = {
    latitude: 48.94013605722221,
    longitude: 24.73779245490163
};

function displayLocation(position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    let div = document.getElementById("location")
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`
    div.innerHTML += ` (with ${position.coords.accuracy} meters accuracy)`
    let km = computeDistance(position.coords, ourCoords)
    let distance = document.getElementById("distance")
    distance.innerHTML = `You are ${km} km from the College`
}

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    const errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2){
        errorMessage = errorMessage + " " + error.message;
    }
    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}
function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6371;

    let distance = Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads) * Radius;
}

function degreesToRadians(degrees){
    let radians = (degrees * Math.PI)/180;
    return radians;
}

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}
function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

let map;
let infoWindow;
let destinationMarker;
let destinationInput;
let destinationButton;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 48.9233632, lng: 24.7181138 },
        zoom: 6,
    });
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    const marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: `Ви тут: ${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}\n${new Date().toLocaleTimeString()}`,
                    });

                    marker.addListener("click", () => {
                        infoWindow.setContent(
                            `Ви тут: ${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}<br>Час: ${new Date().toLocaleTimeString()}`
                        );
                        infoWindow.open(map, marker);
                    });

                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                },
            );
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    destinationInput = document.createElement("input");
    destinationInput.type = "text";
    destinationInput.style.width = '300px';
    destinationInput.placeholder = "Enter Destination Coordinates (lat, lng)";
    document.body.appendChild(destinationInput);

    destinationButton = document.createElement("button");
    destinationButton.textContent = "Set Destination";
    document.body.appendChild(destinationButton);

    destinationButton.addEventListener("click", () => {
        const destinationCoords = parseCoordinates(destinationInput.value);
        if (destinationCoords) {
            
            if (destinationMarker) {
                destinationMarker.setMap(null); 
            }

            destinationMarker = new google.maps.Marker({
                position: destinationCoords,
                map: map,
                title: `Пункт призначення: ${destinationCoords.lat.toFixed(6)}, ${destinationCoords.lng.toFixed(6)}`,
            });

            map.panTo(destinationCoords);
        } else {
            alert("Неправильний формат координат");
        }
    });
}

function parseCoordinates(input) {
    const parts = input.split(",");
    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);

    if (isNaN(lat) || isNaN(lng)) {
        return null;
    }

    return { lat, lng };
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation.",
    );
    infoWindow.open(map);
}

window.initMap = initMap;


