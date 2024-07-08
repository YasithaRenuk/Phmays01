"use client";

import React, { useState } from "react";
import NavCustomer from "../../../components/NavCustomer";
import { useSession } from "next-auth/react";
import Coustomer from "../../../components/Coustomer"
import Account from "../../../components/Account";
import AddRequest from "../../../components/AddRequest"

const Customer = () => {
  const { data: session, status } = useSession();
  const [currentView, setCurrentView] = useState("homepage");

  if (status === "loading") {
    return (
      <div data-theme="cupcake">
        <center>
          <span className="loading loading-spinner"></span>
        </center>
      </div>
    );
  }

  const handleNavChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div data-theme="cupcake">
      <NavCustomer
        email={session?.user?.email || "No user data available"}
        onNavChange={handleNavChange}
      />
      {currentView === "homepage" && <Coustomer id = {session?.user.id}/>}
      {currentView === "account" && <Account id = {session?.user.id|| "No user data available"} email = {session?.user?.email|| "No user data available"}/>}
      {currentView === "addRequest" && <AddRequest id = {session?.user.id|| "No user data available"}/>}
    </div>
  );
};

export default Customer;
