import React, { useEffect, useState } from "react";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const userId = "PUT_REAL_USER_ID";

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/contacts/${userId}`)
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Your Emergency Contacts</h2>

      {contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        contacts.map((c) => (
          <div key={c._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <p><b>{c.name}</b></p>
            <p>{c.phone}</p>
            <p>{c.email}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ContactsList;