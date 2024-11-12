import { useHistory, useParams, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Button } from '@windmill/react-ui';
import { CheckCircle } from 'react-feather';

import { selectCheckoutCartStatus } from '../features/cart/cartSlice';

const CheckOutDone = () => {
  const { state } = useLocation();
  const history = useHistory();
  let { id } = useParams();

  const checkoutStatus = useSelector(selectCheckoutCartStatus);

  useEffect(() => {
    if (!state?.fromCheckoutPage) {
      console.log('Checkout not finished');
      history.push('/');
    }
  }, []);

  return (
    <div className="grid place-items-center border p-10 shadow mt-16">
      <div className="text-center">
        <div className="grid place-items-center">
          <CheckCircle color="green" size={100} />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl">Payment Succesful. Order Nr: {id}</h1>
          <p className="">Thank you for your purchase</p>
          <p className="flex justify-center flex-col md:flex-row space-y-2.5 md:space-y-0 md:space-x-2 mt-2 ">
            <Button className="mx-8" tag={Link} to="/" layout="outline">
              Continue shopping
            </Button>
            <Button className="mx-8" tag={Link} to="/orders" layout="primary">
              Manage Order
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckOutDone;
