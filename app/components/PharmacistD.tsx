import React, { useEffect, useState } from "react";
import ApprovedTable from './ApprovedTable';

interface PharmacistDProps {
  id: string; // or number, adjust as per your actual data type
}

const PharmacistD: React.FC<PharmacistDProps> = ({ id }) => {
  const [requests, setRequests] = useState<any>(null); // Adjust 'any' based on actual response shape
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/pharmacist/GetApprovRequests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ phaid: id }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRequests(data);
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
          <div className="stat-title">Number of Requests Approved</div>
          <div className="stat-value">{requests.requests.length}</div>
        </div>
      </div>
      <ApprovedTable Requests={requests.requests}/>
    </center>
  );
};

export default PharmacistD;
