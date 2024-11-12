import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LayoutHelmet from '../layout/LayoutHelmet';
import { selectCustomerOrders, fetchCustomerOrders, selectFetchCustomerOrdersStatus } from '../features/orders/ordersSlice';
import OrderItems from '../components/orders/OrderItem';

import { Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow } from '@windmill/react-ui';

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();

  const orders = useSelector(selectCustomerOrders);
  const fetchOrdersStatus = useSelector(selectFetchCustomerOrdersStatus);

  useEffect(() => {
    dispatch(fetchCustomerOrders());
  }, [dispatch]);

  const handlePage = num => {
    setCurrentPage(num);
  };

  const goToDetails = orderNr => {
    history.push({
      pathname: `orders/${orderNr}`,
      state: { orderNr: true },
    });
  };

  const onclick = () => {
    console.log(orders);
  };

  if (Object.keys(orders).length === 0) {
    return (
      <LayoutHelmet>
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
      </LayoutHelmet>
    );
  } else {
    return (
      <LayoutHelmet loading={fetchOrdersStatus !== 'succeeded'}>
        <h1 className="my-10 text-center text-4xl font-semibold">Orders</h1>
        <button onClick={onclick}>click</button>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>No. of items</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(orders).map(orderNr => (
                <TableRow className="cursor-pointer" onClick={() => goToDetails(orderNr)} key={orderNr}>
                  <OrderItems key={orderNr} order={orders[orderNr]} orderNr={orderNr} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination totalResults={Object.keys(orders).length} resultsPerPage={2} onChange={handlePage} label="Table navigation" />
          </TableFooter>
        </TableContainer>
      </LayoutHelmet>
    );
  }
};

export default Orders;
