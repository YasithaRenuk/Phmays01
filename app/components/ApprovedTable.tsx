import React from 'react';
import DrugCard from "../components/drugCard";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ApprovedTable = ({ Requests }) => {

  const handleYesClick = async (Appreqid, modalId) => {
    try {
      const response = await fetch('/api/pharmacist/DeleteDoneReq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Appreqid }),
      });

      if (response.ok) {
        toast.success("Request approved successfully!");
        // Refresh the page
        window.location.reload();
      } else {
        toast.error("Failed to approve the request.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while approving the request.");
    } finally {
      document.getElementById(modalId).close();
    }
  };

  const handleNoClick = (modalId) => {
    document.getElementById(modalId).close();
  };

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
            <th>Customer Email</th>
            <th>Is Request Done?</th>
          </tr>
        </thead>
        <tbody>
          {Requests?.length === 0 ? (
            <tr>
              <td colSpan="6">
                <div className="stat bg-white">
                  <p>There are no requests.</p>
                </div>
              </td>
            </tr>
          ) : (
            Requests?.map((Request, index) => {
              const modalId = `modal_${index}`;
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{Request.RequestId}</td>
                  <td>{Request.createDate}</td>
                  <td>
                    {Request.drugs.length === 0 ? (
                      <div className="stat bg-white">
                        <p>Please add drugs to the request.</p>
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
                  <td>{Request.coustomerEmail}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => document.getElementById(modalId).showModal()}
                    >
                      Done
                    </button>
                    <dialog id={modalId} className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Are you sure?</p>
                        <div className="modal-action">
                          <button
                            className="btn btn-active btn-primary"
                            onClick={() => handleYesClick(Request._id, modalId)}
                          >
                            Yes
                          </button>
                          <button
                            className="btn btn-active btn-neutral"
                            onClick={() => handleNoClick(modalId)}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </dialog>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default ApprovedTable;
