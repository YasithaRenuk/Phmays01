import React from "react";
import { signOut } from "next-auth/react";

interface AccountProps {
  id: string;
  email: string;
}

const Account: React.FC<AccountProps> = ({ id, email }) => {
  return (
    <center>
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title">Account Details</h2>
          <br />
          <div className="flex w-full">
            <div className="grid h-10 flex-grow place-items-center">ID</div>
            <div className="divider divider-horizontal"></div>
            <div className="grid h-10 flex-grow place-items-center">{id}</div>
          </div>
          <div className="flex w-full">
            <div className="grid h-10 flex-grow place-items-center">Email</div>
            <div className="divider divider-horizontal"></div>
            <div className="grid h-10 flex-grow place-items-center">{email}</div>
          </div>
          <br />
          <div className="card-actions justify-end">
            <button className="btn" onClick={() => signOut()}>Log out</button>
          </div>
        </div>
      </div>
    </center>
  );
};

export default Account;
