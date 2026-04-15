const Contact = require("../models/contactModel");

// ➕ Add Contact
exports.addContact = async (req, res) => {
  try {
    const { userId, name, phone, email } = req.body;

    const contact = await Contact.create({
      userId,
      name,
      phone,
      email,
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 Get Contacts (USER-WISE)
exports.getContacts = async (req, res) => {
  try {
    const { userId } = req.params;

    const contacts = await Contact.find({ userId });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete Contact
exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};