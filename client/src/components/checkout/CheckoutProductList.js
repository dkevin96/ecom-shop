import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCart, needsCheckoutRedirectUpdated } from '../../features/cart/cartSlice';
import { selectAllProducts, selectFetchAllProductsStatus } from '../../features/products/productsSlice';

import Spinner from '../spinner/Spinner';

const CheckoutProductList = ({ cartItem, quantity }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex border-b-2 py-2 space-x-2">
      <img className="w-1/3" loading="lazy" decoding="async" src={cartItem.image_url} alt={cartItem.name} />
      <div className="flex flex-col space-y-1">
        <span className="text-2xl font-semibold">{cartItem.name}</span>
        <span className="text-xl font-medium">${cartItem.price}</span>
        <span className="">Quantity: {quantity}</span>
      </div>
    </div>
  );
};

export default CheckoutProductList;
