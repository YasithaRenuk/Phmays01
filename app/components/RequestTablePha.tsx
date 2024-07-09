import React from "react";
import DrugCard from "../components/drugCard";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Drug {
  name: string;
  quantity: number;
  measurement: string;
}

interface Request {
  _id: string;
  createDate: string;
  drugs: Drug[];
}

interface RequestTablePhaProps {
  Requests: Request[];
  phaid: string;
  phaEmail: string;
}

const RequestTablePha: React.FC<RequestTablePhaProps> = ({ Requests, phaid, phaEmail }) => {
  const handleApproval = async (reqId: string) => {
    try {
      const response = await fetch("/api/pharmacist/Approv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reqid: reqId, phaid: phaid, phaEmail: phaEmail }),
      });

      if (response.ok) {
        toast.success("Request approved successfully");
        // Refresh the page after a short delay to allow the toast to show
        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2 seconds delay
      } else {
        toast.error("Failed to approve request");
      }
    } catch (error) {
      toast.error("Error approving request");
    }
  };

  const handleYesClick = (reqId: string, modalId: string) => {
    handleApproval(reqId);
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
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
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Date</th>
            <th>Drugs</th>
            <th>Do you Approve</th>
          </tr>
        </thead>
        <tbody>
          {Requests.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <div className="stat bg-white">
                  <p>There are no requests.</p>
                </div>
              </td>
            </tr>
          ) : (
            Requests.map((Request, index) => {
              const modalId = `modal_${index}`;
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{Request._id}</td>
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
};

export default RequestTablePha;
