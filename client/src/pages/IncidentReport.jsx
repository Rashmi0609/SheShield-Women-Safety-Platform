import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Dash/Sidebar";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {

  const [incidentreport, setincidentreport] = useState([]);
  const [report, setReport] = useState("");
  const [ack, setAck] = useState(false);

  const getAllIncident = async () => {
    try {
      const res = await fetch(
        "https://womensecbackend.onrender.com/api/v1/incidents",
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setincidentreport(data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const acknowledge = async (incId) => {
    try {
      const res = await fetch(
        `https://womensecbackend.onrender.com/api/v1/incidents/${incId}`,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
        }
      );

      if (res.status === 200) {
        toast.success("Updated Successfully");
      }
    } catch (e) {
      toast.error("Error while Updating!");
    } finally {
      setAck(!ack);
    }
  };

  useEffect(() => {
    getAllIncident();
    window.scrollTo(0, 0);
  }, [ack]);

  return (
    <div className="d-flex justify-content-start">
      <Sidebar />

      <div className="container table-responsive mx-3">
        <h2 className="text-center mt-3">Women Incident Data</h2>

        <table className="table table-striped table-bordered table-hover mt-4">
          <thead className="table-dark text-center">
            <tr>
              <th>Name</th>
              <th>Report</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {incidentreport.map((p, i) => (
              <tr key={i}>
                <th style={{ color: p.isSeen ? "green" : "red" }}>
                  {p.uname}
                </th>

                <td>
                  {p.isSeen ? (
                    p.report
                  ) : (
                    <button
                      className="btn btn-dark"
                      onClick={() => setReport(p.report)}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      View Report
                    </button>
                  )}
                </td>

                <td>{p.address}</td>
                <td>{p.pincode}</td>

                <td>
                  {p.createdAt.split("T")[0]} -{" "}
                  {p.createdAt.split("T")[1].split(".")[0]}
                </td>

                <td>
                  {p.isSeen ? (
                    <button className="btn btn-success">
                      Acknowledged
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={() => acknowledge(p._id)}
                    >
                      Acknowledge
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                Incident Report
              </h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">{report}</div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;