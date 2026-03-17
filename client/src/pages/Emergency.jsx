import React, { useState, useEffect } from "react";
import "../styles/Emergency.css";
import { PiShieldCheckBold } from "react-icons/pi";
import Parallelx from "../Components/Parallelx";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

const Emergency = () => {

const [long, setLong] = useState("");
const [lat, setLat] = useState("");
const [auth] = useAuth();

const handleSubmit = async () => {

```
try {

  console.log(lat);
  console.log(long);

  const payload = {
    userId: auth?.user?._id,
    lat: lat,
    long: long,
  };

  console.log(payload);

  const res = await fetch(
    "https://womensecbackend.onrender.com/api/v1/emergency/emergencypressed",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (res.status === 200) {
    toast.success("SOS SENT SUCCESSFULLY");
  } else {
    toast.error("SOS FAILED");
  }

} catch (error) {

  console.log(error);
  toast.error("Something went wrong");

}
```

};

const showPosition = (position) => {
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;

```
setLat(latitude);
setLong(longitude);
```

};

const getLocation = () => {
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(showPosition);
} else {
console.log("Geolocation not supported");
}
};

useEffect(() => {
getLocation();
window.scrollTo(0, 0);
}, []);

return (
<> <Navbar />

```
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

            <button
              className="button-30"
              onClick={handleSubmit}
            >
              <PiShieldCheckBold size={180} color="red" />
            </button>

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
