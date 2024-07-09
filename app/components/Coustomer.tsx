import React, { useEffect, useState } from "react";
import RequestTable from "../components/RequestTable";

interface CustomerProps {
  id: string; // Replace with the appropriate type for id
}

const Customer: React.FC<CustomerProps> = ({ id }) => {
  const [requests, setRequests] = useState<any>(null); // Adjust type as per your API response structure
  const [loading, setLoading] = useState<boolean>(true);

  // Function to check if a request is approved
  function checkApproved(request: any) { // Adjust type as per your API response structure
    return request.isApproved;
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/customer/GetRequests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRequests(data);
        console.log(data);
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

  if (!requests || !requests.request) {
    return <center><div>No requests found.</div></center>;
  }

  const totalRequests = requests.request.length;
  const confirmedRequests = requests.request.filter(checkApproved).length;
  const confirmedPercentage = ((confirmedRequests / totalRequests) * 100).toFixed(2);

  return (
    <div>
      <center>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Number of Requests</div>
            <div className="stat-value">{totalRequests}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Number of Confirmed Requests</div>
            <div className="stat-value">{confirmedRequests}</div>
            <div className="stat-desc">{confirmedPercentage}%</div>
          </div>
        </div>
        <RequestTable Requests={requests.request} />
      </center>
    </div>
  );
};

export default Customer;
