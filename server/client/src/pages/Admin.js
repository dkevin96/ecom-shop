import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { AlertCircle } from "react-feather";
import { Button as ButtonAntd } from "antd";

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
} from "../features/users/usersSlice";

import AdminForm from "../components/admin/Adminform";

const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(selectCurrentUser);
  const allUsers = useSelector(selectAllUser);

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const handleDashboardClick = () => {
    history.push("/");
  };

  const handleClick = () => {
    console.log(allUsers);
  };

  if (currentUser.user_role === "admin") {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="text-gray-700 mt-16 mx-auto px-2 lg:px-56 flex-grow h-full w-full">
          <h1 className="my-10 text-center text-4xl font-semibold">Users</h1>
          <button onClick={handleClick}>Click</button>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>USER</TableCell>
                  <TableCell>EMAIL</TableCell>
                  <TableCell>CREATED AT</TableCell>
                  <TableCell>ROLE</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(allUsers).map((keyName) => {
                  return (
                    <TableRow>
                      <AdminForm key={keyName} user={allUsers[keyName]} />
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="text-gray-700 mt-16 mx-auto px-2 lg:px-56 flex-grow h-full w-full">
          <div className="flex flex-col items-center">
            <AlertCircle
              className="w-12 h-12 mt-8 text-purple-200"
              color="green"
            />
            <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">
              Sorry
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Only Admin is allowed to access this page
              <br />
              <ButtonAntd type="link" onClick={handleDashboardClick}>
                Click here to return to Dashboard.
              </ButtonAntd>
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Admin;
