import { useSelector } from "react-redux";
import { useState } from "react";

import {
  selectCurrentUser,
  selectCurrentUserStatus,
} from "../features/users/usersSlice";

import AccountForm from "../components/account/AccountForm";
import EditForm from "../components/account/EditForm";
import LayoutHelmet from "../layout/LayoutHelmet";

const Account = () => {
  const user = useSelector(selectCurrentUser);
  const userStatus = useSelector(selectCurrentUserStatus);
  const [showEditForm, setshowEditForm] = useState(false);

  return (
    <LayoutHelmet title="Profile" loading={userStatus !== "succeeded"} >
      {showEditForm ? (
        <EditForm user={user} setshowEditForm={setshowEditForm} />
      ) : (
        <AccountForm user={user} setshowEditForm={setshowEditForm} />
      )}
    </LayoutHelmet>
  );
};

export default Account;
