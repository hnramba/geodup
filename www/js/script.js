var latitude = 0;
var longitude = 0;
var map;

$(document).ready(function () {
  navigator.geolocation.getCurrentPosition(userLocated, locationError);

  $(document).on("pagechange", function () {
    map.invalidateSize();
  });

  function userLocated(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    map = L.map("map").setView([latitude, longitude], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup("This is My Location")
      .openPopup();
    map.invalidateSize();
  }
  function locationError(error) {
    alert("Error code: " + error.code);
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("Permission Denied- " + error.message);
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Position Not Available- " + error.message);
        break;
      case error.TIMEOUT:
        alert("Request Time out- " + error.message);
        break;
    }
  }
});
