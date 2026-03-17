import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/auth'
import toast from 'react-hot-toast'
import reports from '../images/report.png'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'

const Report = () => {

  const [report, setReport] = useState('')
  const [pincodeOfIncident, setpincodeOfIncident] = useState('')
  const [address, setAddress] = useState('')
  const [auth] = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!report.trim()) {
      toast.error('Report is Required!')
      return
    }

    if (!pincodeOfIncident.trim()) {
      toast.error('PinCode is Required!')
      return
    }

    if (!address.trim()) {
      toast.error('Address is Required!')
      return
    }

    try {
      const res = await axios.post(
        'https://womensecbackend.onrender.com/api/v1/incidents',
        {
          user: auth?.user?._id,
          report,
          pincodeOfIncident,
          address
        }
      )

      if (res.status === 201) {
        toast.success('Incident Reported Successfully')
        setReport('')
        setpincodeOfIncident('')
        setAddress('')
      }

    } catch (err) {
      toast.error('Error in Sending Report')
    }
  }

  return (
    <>
      <Navbar />

      <div className="marginStyle">
        <div className="container d-flex justify-content-center align-items-center">

          <div className="row border rounded-5 p-3 bg-white shadow box-area reverseCol">

            {/* LEFT IMAGE */}

            <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">

              <div className="featured-image mb-3 animateImg">
                <img src={reports} className="img-fluid" alt="report" />
              </div>

            </div>

            {/* FORM */}

            <form className="col-md-6 right-box" onSubmit={handleSubmit}>

              <div className="row align-items-center">

                <div className="header-text mb-4">
                  <h2>Incident Report</h2>
                  <p>Tell us your incident, we will take action against it!</p>
                </div>

                {/* PINCODE */}

                <div className="input-group mb-3">
                  <input
                    type="number"
                    value={pincodeOfIncident}
                    onChange={(e) => setpincodeOfIncident(e.target.value)}
                    className="form-control form-control-lg border-dark fs-6"
                    placeholder="Enter the Pincode of the Incident"
                    required
                  />
                </div>

                {/* REPORT */}

                <div className="input-group mb-3">
                  <textarea
                    rows={3}
                    value={report}
                    onChange={(e) => setReport(e.target.value)}
                    className="form-control form-control-lg border-dark fs-6"
                    placeholder="Write the Report of the Incident"
                    required
                  />
                </div>

                {/* ADDRESS */}

                <div className="input-group mb-3">
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control form-control-lg border-dark fs-6"
                    placeholder="Enter the Address of the Incident"
                    required
                  />
                </div>

                {/* BUTTON */}

                <div className="d-flex my-3">
                  <button
                    className="btn text-white btn-lg btn-block"
                    style={{ width: '100%', backgroundColor: 'blueviolet' }}
                    type="submit"
                  >
                    Submit Incident
                  </button>
                </div>

              </div>

            </form>

          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Report