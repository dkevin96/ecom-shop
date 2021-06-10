import { useSelector } from "react-redux";
import { useState } from "react";

import { selectCurrentUser } from "../features/users/usersSlice";

import AccountForm from "../components/account/AccountForm";
import EditForm from "../components/account/EditForm";

const Account = () => {
  const user = useSelector(selectCurrentUser);
  const [isSending, setIsSending] = useState(false);
  const [showEditForm, setshowEditForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="text-gray-700 mt-16 mx-auto px-2 lg:px-56 flex-grow h-full w-full">
        {showEditForm ? (
          <EditForm user={user} setshowEditForm={setshowEditForm} />
        ) : (
          <AccountForm user={user} setshowEditForm={setshowEditForm} />
        )}
      </div>
    </div>
  );
};

export default Account;
