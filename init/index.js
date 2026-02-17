require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const geocoder = require("../public/js/geocoder.js"); // adjust path if needed

const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log(" Connected to DB");
    initDB();
  })
  .catch((err) => {
    console.error(" DB connection error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  console.log(" Old listings removed");

  for (let obj of initData.data) {
    try {
      // Geocode the location
      const geoData = await geocoder.geocode(obj.location);

      if (!geoData.length) {
        console.warn(` No geocoding result for: ${obj.location}`);
        continue;
      }

      const newListing = new Listing({
        ...obj,
        owner: "6926f97381273b92a259cebd",
        geometry: {
          type: "Point",
          coordinates: [geoData[0].longitude, geoData[0].latitude],
        },
      });

      await newListing.save();
      console.log(`Saved: ${newListing.title}`);
    } catch (err) {
      console.error(`Failed to save ${obj.title}:`, err);
    }
  }

  mongoose.connection.close();
};
