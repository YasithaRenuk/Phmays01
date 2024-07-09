'use client';

import React, { useState } from "react";
import NavCustomer from "../../../components/NavCustomer";
import { useSession } from "next-auth/react";
import Coustomer from "../../../components/Coustomer";
import Account from "../../../components/Account";
import AddRequest from "../../../components/AddRequest";

const Customer: React.FC = () => {
  const { data: session, status } = useSession();
  const [currentView, setCurrentView] = useState<string>("homepage");

  if (status === "loading") {
    return (
      <div data-theme="cupcake">
        <center>
          <span className="loading loading-spinner"></span>
        </center>
      </div>
    );
  }

  const handleNavChange = (view: string) => {
    setCurrentView(view);
  };

  // Ensure userId is always a string
  const userId: string = session?.user?.id?.toString() || '';

  return (
    <div data-theme="cupcake">
      <NavCustomer
        email={(session?.user as { email?: string })?.email || "No user data available"}
        onNavChange={handleNavChange}
      />
      {currentView === "homepage" && <Coustomer id={userId} />}
      {currentView === "account" && (
        <Account
          id={userId}
          email={(session?.user as { email?: string })?.email || "No user data available"}
        />
      )}
      {currentView === "addRequest" && (
        <AddRequest id={userId} />
      )}
    </div>
  );
};

export default Customer;
