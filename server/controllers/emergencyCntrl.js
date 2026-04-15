const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");
const { Emergency } = require("../models/emergencyModel");
const Contact = require("../models/contactModel");
const { sendHelpEmail, sendHelpEmailContacts } = require("../utils/email");
const axios = require("axios");

// 📍 Get Address
const getAddress = async (lat, long) => {
  try {
    const { data } = await axios.get(
      `https://apis.mapmyindia.com/advancedmaps/v1/${process.env.MAP_API}/rev_geocode?lat=${lat}&lng=${long}`
    );

    if (data?.results?.length > 0) {
      return {
        pincode: data.results[0].pincode,
        formatted_address: data.results[0].formatted_address,
      };
    }

    return {
      pincode: "Unknown",
      formatted_address: "Location not found",
    };
  } catch (err) {
    console.log("Map API Error:", err.message);
    return {
      pincode: "Unknown",
      formatted_address: "Location not found",
    };
  }
};

// 🚨 MAIN CONTROLLER
const sendemergencyCntrl = asyncHandler(async (req, res) => {
  console.log("🔥 CONTROLLER RUNNING");

  const { userId, lat, long } = req.body;

  if (!userId || !lat || !long) {
    return res.status(400).json({ message: "Missing data" });
  }

  console.log("SOS Received:", userId, lat, long);

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  // 📍 Get Address
  const { pincode, formatted_address } = await getAddress(lat, long);

  // 👥 GET CONTACTS
  const contacts = await Contact.find({ userId });

  const recipients = contacts
    .map((c) => c.email)
    .filter((email) => email);

  console.log("Recipients:", recipients);

  // 📧 SEND EMAIL TO CONTACTS
  if (recipients.length > 0) {
    await sendHelpEmail(
      recipients,
      lat,
      long,
      user.uname,
      pincode,
      formatted_address
    );
    console.log("✅ Email sent to contacts");
  } else {
    console.log("❌ No contacts found");
  }

  // 📧 SEND TO NEARBY USERS
  const nearbyUsers = await User.find({ pinCode: pincode });
  const nearbyEmails = nearbyUsers.map((u) => u.email);

  if (nearbyEmails.length > 0) {
    await sendHelpEmailContacts(
      nearbyEmails,
      lat,
      long,
      user.uname,
      pincode,
      formatted_address
    );
    console.log("✅ Email sent to nearby users");
  }

  // 💾 SAVE
  const emergency = await Emergency.create({
    user: userId,
    emergencyLctOnMap: `https://maps.google.com/maps?q=${lat},${long}`,
    addressOfIncd: formatted_address,
    pincode,
    isResolved: false,
  });

  res.status(200).json({
    message: "SOS sent successfully",
    emergencyId: emergency._id,
  });
});

// OTHER APIs
const getAllEmergencies = asyncHandler(async (req, res) => {
  const data = await Emergency.find().populate("user");
  res.json(data);
});

const getSinglEmergency = asyncHandler(async (req, res) => {
  const data = await Emergency.findById(req.params.id).populate("user");
  res.json(data);
});

const emergencyUpdate = asyncHandler(async (req, res) => {
  const data = await Emergency.findByIdAndUpdate(
    req.params.id,
    { isResolved: true },
    { new: true }
  );
  res.json(data);
});

module.exports = {
  sendemergencyCntrl,
  getAllEmergencies,
  getSinglEmergency,
  emergencyUpdate,
};