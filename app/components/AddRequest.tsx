import React, { useState } from "react";
import DrugCard from '../components/drugCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddRequest = ({ id }: { id: string }) => {
  const [drugs, setDrugs] = useState<{ name: string; quantity: string; measurement: string; }[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [measurement, setMeasurement] = useState("");
  const customerId = id; // Replace with actual customer ID as needed

  const handleAddDrug = () => {
    const newDrug = { name, quantity, measurement };
    setDrugs([...drugs, newDrug]);
    setName("");
    setQuantity("");
    setMeasurement("");
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement | null;
    if (modal) {
      modal.showModal(); // Use showModal method here
    }
  };

  const handleSubmit = async () => {
    const requestBody = {
      customerId,
      drugs
    };
    try {
      const response = await fetch("/api/customer/AddRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      toast.success("Request submitted successfully!");
      console.log("Response:", data);
      // Handle the response as needed
    } catch (error: any) { // Type assertion or specific error type
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
        console.error("Error:", error);
      } else {
        toast.error(`Error occurred: ${error}`);
        console.error("Error:", error);
      }
      // Handle the error as needed
    }
  };

  const handleReset = () => {
    setDrugs([]);
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Add New Request</h2>
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-col lg:flex-row">
              <div className="card grid h-32 flex-grow place-items-center">
                Drugs
              </div>
              <div className="divider lg:divider-horizontal"></div>
              <div className="card grid flex-grow place-items-center">
                <div className="stats stats-vertical shadow bg-transparent">
                  {drugs.length === 0 ? (
                    <div className="stat bg-white">
                      <p>Please add drugs to request.</p>
                    </div>
                  ) : (
                    drugs.map((drug, index) => (
                      <div className=" bg-white" key={index}>
                        <DrugCard
                          name={drug.name}
                          quantity={drug.quantity}
                          measurement={drug.measurement}
                        />
                        <p></p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="card grid h-20 place-items-center">
              <button
                className="btn"
                onClick={() => {
                  const modal = document.getElementById("my_modal_2") as HTMLDialogElement | null;
                  if (modal) {
                    modal.showModal(); // Use showModal method here
                  }
                }}
              >
                Add Drug
              </button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box text-black bg-gray-800">
                  <h3 className="font-bold text-lg">Add Drug</h3>
                  <div className="flex w-full flex-col">
                    <p className="py-4">Press ESC key to close</p>
                    <div className="divider"></div>
                    <div className="flex w-full">
                      <div className="card rounded-box grid h-20 flex-grow place-items-center">
                        <input
                          type="text"
                          placeholder="Name"
                          className="input input-bordered w-full max-w-xs"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="divider divider-horizontal"></div>
                      <div className="card rounded-box grid h-20 flex-grow place-items-center">
                        <input
                          type="number"
                          placeholder="Quantity"
                          className="input input-bordered w-full max-w-xs"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                      <div className="divider divider-horizontal"></div>
                      <div className="card rounded-box grid h-20 flex-grow place-items-center">
                        <input
                          type="text"
                          placeholder="Measurement"
                          className="input input-bordered w-full max-w-xs"
                          value={measurement}
                          onChange={(e) => setMeasurement(e.target.value)}
                        />
                      </div>
                    </div>
                    <button className="btn" onClick={handleAddDrug}>
                      Add
                    </button>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn btn-ghost" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddRequest;
