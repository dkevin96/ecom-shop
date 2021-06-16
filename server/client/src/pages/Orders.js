import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  selectCustomerOrders,
  fetchCustomerOrders,
} from "../features/orders/ordersSlice";

import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();

  const orders = useSelector(selectCustomerOrders);

  useEffect(() => {
    dispatch(fetchCustomerOrders());
  }, [dispatch]);

  const handlePage = (num) => {
    setCurrentPage(num);
  };

  const goToDetails = (order) => {
    // history.push({
    //   pathname: `orders/${order.order_id}`,
    //   state: { order },
    // });
  };

  if (Object.keys(orders).length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="text-gray-700 mt-16 mx-auto px-2 lg:px-56 flex-grow h-full w-full">
          <h1
            className="
           text-center text-4xl font-semibold"
          >
            Orders
          </h1>
          <p
            className="
           text-center"
          >
            You are yet to place an order
          </p>
        </div>
      </div>
    );
  }
};

export default Orders;
