import React from "react";
import DrugCard from "../components/drugCard";

const RequestTable = ({ Requests }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Date</th>
            <th>Drugs</th>
            <th>IsApproved</th>
            <th>Approved By</th>
          </tr>
        </thead>
        <tbody>
          {Requests.length === 0 ? (
            <tr>
              <td colSpan="6">
                <div className="stat bg-white">
                  <p>There are no requests.</p>
                </div>
              </td>
            </tr>
          ) : (
            Requests.map((Request, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{Request.id}</td>
                <td>{Request.createDate}</td>
                <td>
                  {Request.drugs.length === 0 ? (
                    <div className="stat bg-white">
                      <p>Please add drugs to request.</p>
                    </div>
                  ) : (
                    Request.drugs.map((drug, drugIndex) => (
                      <div className="bg-white" key={drugIndex}>
                        <DrugCard
                          name={drug.name}
                          quantity={drug.quantity}
                          measurement={drug.measurement}
                        />
                      </div>
                    ))
                  )}
                </td>
                <td>{Request.isApproved ? "Yes" : "No"}</td>
                <td>
                  {Request.pharmacistId === null ? (
                    <div>
                      <p>Still not Approved</p>
                    </div>
                  ) : (
                    Request.pharmacistEmail
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
