import { useSelector, useDispatch } from "react-redux";

import CartProduct from "../components/cart/CartProduct";

import {
  selectCart,
  needsCheckoutRedirectUpdated,
} from "../features/cart/cartSlice";
import { selectAllProducts } from "../features/products/productsSlice";

import { Link } from "react-router-dom";
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
import { ShoppingCart } from "react-feather";

import { useHistory } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cartContents = useSelector(selectCart);
  const products = useSelector(selectAllProducts);

  const handleCheckout = () => {
    dispatch(needsCheckoutRedirectUpdated(true));
    history.push("/checkout");
  };

  const totalPrice = Object.keys(cartContents).reduce(
    (acc, keyName) =>
      acc + products[keyName].price * cartContents[keyName].quantity,
    0
  );

  if (Object.keys(cartContents).length === 0) {
    return (
      <div className="mt-10">
        <div className="grid justify-center">
          <h1 className="my-10 text-center text-4xl font-semibold">
            Shopping Cart
          </h1>
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
  } else {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="text-gray-700 mt-16 mx-auto px-2 lg:px-56 flex-grow h-full w-full">
          <h1 className="my-10 text-center text-4xl font-semibold">
            Shopping Cart
          </h1>
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
                {Object.keys(cartContents).map((keyName) => (
                  <TableRow>
                    <CartProduct
                      key={keyName}
                      cartItem={products[keyName]}
                      quantity={cartContents[keyName].quantity}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter className="flex flex-col justify-end items-end">
              <div className="mb-2 text-xl">Total: ${totalPrice}</div>
              <Button
                tag={Link}
                to={{
                  pathname: "/checkout",
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
