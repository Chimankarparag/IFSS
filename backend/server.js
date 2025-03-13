require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

// MongoDB Connection
const uri = process.env.MONGODB_URI || "mongodb+srv://IFSS:IFSS@ifss.bzjrj.mongodb.net/IFSS?retryWrites=true&w=majority&appName=IFSS";

// Define Schema
const indianDataSchema = new mongoose.Schema({
  name: String,
  phone: String,
  pan_number: String,
  dob: String,
  address: String,
  pincode: String
}, { collection: "PAN" });

const IndianData = mongoose.model("PAN", indianDataSchema);

// 🔥 Helper Functions to Generate Data

// ✅ Generate Valid PAN Number (ABCDE1234F)
function generatePAN() {
  const letters = faker.string.alpha(5).toUpperCase();
  const numbers = faker.string.numeric(4);
  const lastLetter = faker.string.alpha(1).toUpperCase();
  return `${letters}${numbers}${lastLetter}`;
}

// ✅ Generate a Realistic Indian Phone Number
function generatePhoneNumber() {
    const prefixes = ["98", "97", "96", "95", "94", "93", "92", "91", "90", "99", "88", "89", "86", "85"];
    const firstTwoDigits = faker.helpers.arrayElement(prefixes);
    const lastEightDigits = faker.string.numeric(8);
    return `${firstTwoDigits}${lastEightDigits}`; // Returns 10-digit number
  }

// ✅ Generate an Indian Address with Pincode
function generateIndianAddress() {
  const indianCities = [
    { city: "Mumbai", pincode: "400001" },
    { city: "Delhi", pincode: "110001" },
    { city: "Bangalore", pincode: "560001" },
    { city: "Hyderabad", pincode: "500001" },
    { city: "Chennai", pincode: "600001" },
    { city: "Kolkata", pincode: "700001" },
    { city: "Pune", pincode: "411001" },
    { city: "Ahmedabad", pincode: "380001" },
    { city: "Jaipur", pincode: "302001" },
    { city: "Lucknow", pincode: "226001" }
  ];

  const selectedCity = faker.helpers.arrayElement(indianCities);
  return { address: `${faker.location.streetAddress()}, ${selectedCity.city}`, pincode: selectedCity.pincode };
}

// ✅ Bulk Insert Function (10,000 at a time)
async function insertBulkIndianData(count) {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("✅ Connected to MongoDB");

  const batchSize = 10000; // Insert 10,000 records per batch
  let totalInserted = 0;

  for (let i = 0; i < count / batchSize; i++) {
    const records = [];

    for (let j = 0; j < batchSize; j++) {
      const { address, pincode } = generateIndianAddress();
      records.push({
        name: faker.person.fullName(),
        phone: generatePhoneNumber(),
        pan_number: generatePAN(),
        dob: faker.date.birthdate({ min: 1960, max: 2002, mode: "year" }).toISOString().split("T")[0],
        address,
        pincode
      });
    }

    await IndianData.insertMany(records, { ordered: false })
      .then(() => {
        totalInserted += batchSize;
        console.log(`✅ Inserted: ${totalInserted}/${count}`);
      })
      .catch((err) => console.error("❌ Insert Error:", err));
  }

  console.log("🎉 Bulk Data Insertion Completed!");
  mongoose.disconnect();
}

// 🔥 Call function to insert 1 Million records
insertBulkIndianData(1000000); // Change number to generate more
