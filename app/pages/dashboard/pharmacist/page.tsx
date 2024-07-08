'use client';

import React, { useState } from "react";
import NavPharmacist from '../../../components/NavPharmacist';
import Account from "../../../components/Account";
import CheckRequests from "../../../components/checkRequests";
import PharmacistD from "../../../components/PharmacistD"
import { useSession } from "next-auth/react";

const Pharmacist = () => {
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
  
  const handleNavChange = (view: string) => {
    setCurrentView(view);
  };

  return (
    <div data-theme="cupcake">
      <NavPharmacist
        email={session?.user?.email || "No user data available"}
        onNavChange={handleNavChange}
      />
      {currentView === "homepage" && <PharmacistD id={session?.user?.id || "No user data available"}/>}
      {currentView === "account" && <Account id={session?.user?.id || "No user data available"} email={session?.user?.email || "No user data available"} />}
      {currentView === "checkRequest" && <CheckRequests id={session?.user?.id || "No user data available"} email={session?.user?.email || "No user data available"}/>}
    </div>
  );
};

export default Pharmacist;
