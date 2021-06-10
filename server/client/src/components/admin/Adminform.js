import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { AlertCircle } from "react-feather";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  Button,
} from "@windmill/react-ui";

import {
  selectCurrentUser,
  selectAllUser,
  fetchAllUser,
} from "../../features/users/usersSlice";

const AdminForm = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { user } = props;

  useEffect(() => {
    console.log(user);
  });

  const d = new Date(user.date_joined);
  var date = d.getDate();
  var month = d.getMonth() + 1;
  var year = d.getFullYear();
  var dateStr = d.toDateString();

  return (
    <>
      <TableCell>
        {user.first_name} {user.last_name}
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell className="items-center mr-8">{dateStr}</TableCell>
      <TableCell>{user.user_role}</TableCell>
    </>
  );
};

export default AdminForm;
