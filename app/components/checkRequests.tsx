import React, { useEffect, useState } from "react";
import RequestTablePha from "../components/RequestTablePha"


const CheckRequests = ({ id,email }) => {
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/pharmacist/GetRequests", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRequests(data);
        console.log(data)
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [id]);

  if (loading) {
    return <center><span className="loading loading-dots loading-lg"></span></center>;
  }

  if (!requests) {
    return <center><div>No requests found.</div></center>;
  }

  return (
    <center>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Number of Requests</div>
          <div className="stat-value">{requests.request.length}</div>
        </div>
      </div>
      <RequestTablePha Requests={requests.request} phaid = {id} phaEmail={email} />
    </center>
  );
};

export default CheckRequests;
