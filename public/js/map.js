document.addEventListener("DOMContentLoaded", function () {
  const mapDiv = document.getElementById("map");

  // Get JSON string from 'listing' attribute
  const listingJSON = mapDiv.getAttribute("listing");

  // Parse to object
  const listing = JSON.parse(listingJSON);

  // Extract coordinates and flip [lng, lat] to [lat, lng]
  const coordinates = listing.geometry.coordinates;
  const latLng = [coordinates[1], coordinates[0]]; // flip to [lat, lng]
  const map = L.map("map").setView(latLng, 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 15,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  console.log(latLng);
  L.marker(latLng).addTo(map).bindPopup(listing.location).openPopup();
});
