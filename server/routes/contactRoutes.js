const express = require("express");
const router = express.Router();

const {
  addContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");

router.post("/add", addContact);
router.get("/:userId", getContacts); // ✅ FIXED
router.delete("/:id", deleteContact);

module.exports = router;