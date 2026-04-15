import React, { useState, useEffect, useCallback } from "react";
import "../styles/Emergency.css";
import { PiShieldCheckBold } from "react-icons/pi";
import Parallelx from "../Components/Parallelx";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";

const Emergency = () => {
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  // 📍 Get Location
  const showPosition = (position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  };

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        showPosition,
        (error) => {
          console.log(error);
          toast.error("⚠️ Please allow location access");
        }
      );
    } else {
      toast.error("Geolocation not supported");
    }
  }, []);

  useEffect(() => {
    getLocation();
    window.scrollTo(0, 0);
  }, [getLocation]);

  // 🚨 SOS FUNCTION
  const handleSubmit = async () => {
  if (loading) return; // 🚫 prevent double click

  try {
    if (!auth?.user?._id) {
      toast.error("Please login first");
      return;
    }

    if (!lat || !long) {
      toast.error("Location not loaded");
      return;
    }

    setLoading(true);

    const res = await fetch(
      "http://localhost:8000/api/v1/emergency/emergencyPressed",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: auth.user._id,
          lat,
          long,
        }),
      }
    );

    const data = await res.json();

    if (res.status === 200) {
      toast.success("🚨 SOS SENT");
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    console.log(err);
    toast.error("Error sending SOS");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Navbar />

      <div className="heightRes">
        <section className="banner_wrapper">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-12 text-center">
                
                <p className="banner-subtitle">
                  SheShield – Your Safety Our Priority
                </p>

                <h1 className="banner-title mb-5">
                  Help us bring <span>Women Safety</span> to Reality
                </h1>

                {/* 🔥 SOS BUTTON */}
                <button
                  className="button-30"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <PiShieldCheckBold size={150} color="red" />
                </button>

                {/* 🔄 STATUS TEXT */}
                {loading && <p style={{ marginTop: "10px" }}>Sending SOS...</p>}
                {!lat && <p>📍 Fetching your location...</p>}

              </div>
            </div>
          </div>
        </section>
      </div>

      <Parallelx />
      <Footer />
    </>
  );
};

export default Emergency;
