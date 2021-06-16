import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import LayoutHelmet from "../layout/LayoutHelmet";

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
  fetchCurrentUser,
  selectDeleteUserStatus,
  selectAllUserStatus,
  selectCurrentUserStatus,
} from "../features/users/usersSlice";

import AdminForm from "../components/admin/Adminform";
import AdminFormAntd from "../components/admin/Adminform_antd";
import { ConsoleSqlOutlined } from "@ant-design/icons";
const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isDeleted, setIsdeleted] = useState(false);
  const [data, setData] = useState([]);
  const currentUser = useSelector(selectCurrentUser);
  const allUsers = useSelector(selectAllUser);
  const currentUserStatus = useSelector(selectCurrentUserStatus);
  const deleteStatus = useSelector(selectDeleteUserStatus);
  const allUserStatus = useSelector(selectAllUserStatus);

  useEffect(() => {
    dispatch(fetchAllUser());
    dispatch(fetchCurrentUser());
  }, [dispatch, deleteStatus]);

  useEffect(() => {
    if (allUserStatus === "succeeded") {
      setData(
        Object.keys(allUsers)
          .map((keyName) => allUsers[keyName])
          .map((row) => ({
            key: row.id,
            id: row.id,
            email: row.email,
            first_name: row.first_name,
            last_name: row.last_name,
            date_joined: new Date(row.date_joined).toDateString(),
            user_role: row.user_role,
          }))
      );
    }
  }, [allUserStatus]);

  const handleDashboardClick = () => {
    history.push("/");
  };

  // useEffect(() => {
  //   setArray()
  // })
  // const [array, setArray] = useState([]);
  // Object.keys(allUsers).map((keyName) => )

  // let array2 = [];
  // let array3 = [];
  // let array4 = [];
  // const [a, seta] = useState([]);
  // array2 = Array.map((ele) => Object.assign({}, ele, { key: ele.id }));
  // array3 = Array.map((ele) => {
  //   return ele, { ...ele, key: ele.id };
  // });
  // array4 = Array.map((row) => ({
  //   key: row.id,
  //   id: row.id,
  //   email: row.email,
  //   first_name: row.first_name,
  //   last_name: row.last_name,
  //   date_joined: new Date(row.date_joined).toDateString(),
  //   user_role: row.user_role,
  // }));

  const handleClick = () => {
    console.log(Object.keys(allUsers).map((keyName) => allUsers[keyName]));
    setData(
      // new Date(row.date_joined).toDateString()
      Object.keys(allUsers)
        .map((keyName) => allUsers[keyName])
        .map((row) => ({
          key: row.id,
          id: row.id,
          email: row.email,
          first_name: row.first_name,
          last_name: row.last_name,
          date_joined: new Date(row.date_joined).toDateString(),
          user_role: row.user_role,
        }))
    );
  };

  if (currentUser.user_role === "admin") {
    return (
      <>
        <LayoutHelmet loading={allUserStatus !== "succeeded"}>
          <h1 className="my-10 text-center text-4xl font-semibold">Users</h1>
          <button
            className="my-2 text-center font-semibold"
            onClick={handleClick}
          >
            Click here to refresh Table
          </button>
          {allUserStatus === "succeeded" ? (
            <AdminFormAntd
              dataSource={data}
              currentUser={currentUser}
            ></AdminFormAntd>
          ) : null}
        </LayoutHelmet>
      </>
    );
  } else {
    return (
      <LayoutHelmet>
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
      </LayoutHelmet>
    );
  }
};

export default Admin;
