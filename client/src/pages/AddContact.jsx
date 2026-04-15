import React, { useState } from "react";
import { useAuth } from "../context/auth";

const AddContact = () => {
  const [auth] = useAuth(); // ✅ get logged-in user

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const addContact = async () => {
    try {
      // 🚨 CHECK LOGIN
      if (!auth?.user?._id) {
        alert("Please login first");
        return;
      }

      console.log("User ID:", auth.user._id); // 🔍 debug

      const res = await fetch("http://localhost:8000/api/v1/contacts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: auth.user._id, // ✅ FIXED
          name,
          phone,
          email,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (res.status === 201) {
        alert("✅ Emergency Contact Added");

        // 🔄 clear form
        setName("");
        setPhone("");
        setEmail("");
      } else {
        alert(data.message || "Error adding contact");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Add Emergency Contact</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "10px 0" }}
      />

      <input
        type="text"
        placeholder="Enter Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "10px 0" }}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "10px 0" }}
      />

      <button
        onClick={addContact}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#ff4d4d",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      >
        Add Contact
      </button>
    </div>
  );
};

export default AddContact;