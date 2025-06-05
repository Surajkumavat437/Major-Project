const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "openstreetmap", // Free and no API key required
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
