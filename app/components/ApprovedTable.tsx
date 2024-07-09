import React from 'react';
import DrugCard from "../components/drugCard";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Request {
  RequestId: string;
  createDate: string; // Adjust type if createDate is not a string
  drugs: {
    name: string;
    quantity: number;
    measurement: string;
  }[];
  coustomerEmail: string; // Corrected typo from coustomerEmail to customerEmail
}

interface Props {
  Requests: Request[];
}

const ApprovedTable: React.FC<Props> = ({ Requests }) => {
  const handleYesClick = async (Appreqid: string, modalId: string) => {
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
        // Refresh the page or update state to reflect the change
        window.location.reload();
      } else {
        toast.error("Failed to approve the request.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while approving the request.");
    } finally {
      // Safely close the modal
      const modal = document.getElementById(modalId) as HTMLDialogElement | null;
      if (modal) {
        modal.close();
      }
    }
  };

  const handleNoClick = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* Head */}
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Date</th>
            <th>Drugs</th>
            <th>Customer Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Requests?.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <div className="stat bg-white">
                  <p>There are no requests.</p>
                </div>
              </td>
            </tr>
          ) : (
            Requests?.map((request, index) => {
              const modalId = `modal_${index}`;
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{request.RequestId}</td>
                  <td>{request.createDate}</td>
                  <td>
                    {request.drugs.length === 0 ? (
                      <div className="stat bg-white">
                        <p>Please add drugs to the request.</p>
                      </div>
                    ) : (
                      request.drugs.map((drug, drugIndex) => (
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
                  <td>{request.coustomerEmail}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        const modal = document.getElementById(modalId) as HTMLDialogElement | null;
                        if (modal) {
                          modal.showModal();
                        }
                      }}
                    >
                      Approve
                    </button>
                    <dialog id={modalId} className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirmation</h3>
                        <p className="py-4">Are you sure you want to approve this request?</p>
                        <div className="modal-action">
                          <button
                            className="btn btn-active btn-primary"
                            onClick={() => handleYesClick(request.RequestId, modalId)}
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
