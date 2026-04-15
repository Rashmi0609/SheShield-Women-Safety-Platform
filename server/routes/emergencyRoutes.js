const express = require("express");
const router = express.Router();

const {
  sendemergencyCntrl,
  getAllEmergencies,
  getSinglEmergency,
  emergencyUpdate,
} = require("../controllers/emergencyCntrl");

// 🚨 SOS ROUTE
router.post("/emergencyPressed", sendemergencyCntrl);

// Admin
router.get("/", getAllEmergencies);
router.get("/:id", getSinglEmergency);
router.put("/:id", emergencyUpdate);

module.exports = router;