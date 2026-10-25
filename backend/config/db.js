const dns = require("dns");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Support either MONGODB_URL (used in this project) or the common MONGODB_URI
    const mongoUri = process.env.MONGODB_URL || process.env.MONGODB_URI;

    if (!mongoUri) {
      console.warn("MongoDB connection skipped because MONGODB_URL / MONGODB_URI is not configured.");
      return;
    }

    if (mongoUri.startsWith("mongodb+srv://")) {
      try {
        dns.setServers(["8.8.8.8", "8.8.4.4"]);
      } catch (dnsErr) {
        // Fallback silently if setting custom DNS servers is not allowed
      }
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    console.warn("Continuing without MongoDB for local API testing.");
  }
};

module.exports = connectDB;
