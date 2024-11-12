import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { TableContainer, Table, TableHeader, TableBody, TableRow, TableCell, TableFooter, Button } from '@windmill/react-ui';
import { ShoppingCart } from 'react-feather';

import CartProduct from '../components/cart/CartProduct';
import Spinner from '../components/spinner/Spinner';

import { selectCart, needsCheckoutRedirectUpdated, fetchCurrentCart } from '../features/cart/cartSlice';
import { selectAllProducts, fetchAllProducts, selectFetchAllProductsStatus } from '../features/products/productsSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [totalPrice, setTotalPrice] = useState();

  const products = useSelector(selectAllProducts);
  const cartContents = useSelector(selectCart);
  const fetchStatus = useSelector(selectFetchAllProductsStatus);

  const handleCheckout = () => {
    dispatch(needsCheckoutRedirectUpdated(true));
    history.push('/checkout');
  };

  useEffect(() => {
    if (fetchStatus === 'succeeded') {
      const totalPriceTemp = Object.keys(cartContents).reduce(
        (acc, keyName) => acc + parseFloat(products[keyName].price) * cartContents[keyName].quantity,
        0
      );
      setTotalPrice(totalPriceTemp);
    }
  }, [fetchStatus, dispatch, cartContents]);

  if (Object.keys(cartContents).length === 0) {
    return (
      <div className="mt-10">
        <div className="grid justify-center">
          <h1 className="my-10 text-center text-4xl font-semibold">Shopping Cart</h1>
          <div className="h-full flex flex-col justify-center items-center">
            <ShoppingCart size={150} />
            <p>Cart is empty</p>
            <Button tag={Link} to="/">
              Continue shopping
            </Button>
          </div>
        </div>
      </div>
    );
  } else if (fetchStatus !== 'succeeded') {
    return (
      <>
        <Spinner size={100} loading />
      </>
    );
  } else {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="text-gray-700 mt-16 mx-auto px-2 lg:px-56 flex-grow h-full w-full">
          <h1 className="my-10 text-center text-4xl font-semibold">Shopping Cart</h1>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(cartContents).map(keyName => (
                  <TableRow>
                    <CartProduct key={keyName} cartItem={products[keyName]} quantity={cartContents[keyName].quantity} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter className="flex flex-col justify-end items-end">
              <div className="mb-2 text-xl">Total: ${totalPrice}</div>
              <Button
                tag={Link}
                to={{
                  pathname: '/checkout',
                }}
              >
                Checkout
              </Button>
            </TableFooter>
          </TableContainer>
        </div>
      </div>
    );
  }
};

export default Cart;
