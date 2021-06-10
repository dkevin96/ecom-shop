import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Button, TableCell } from "@windmill/react-ui";

import {
  removeProductFromCart,
  changeProductQuantity,
} from "../../features/cart/cartSlice";

const CartProduct = ({ cartItem, quantity }) => {
  const [productQty, setProductQty] = useState(quantity);
  const [subTotalPrice, setsubTotalPrice] = useState(
    productQty * cartItem.price
  );
  const dispatch = useDispatch();

  // console.log(cartItem);
  // id: 12, name: "Polaris Clock", price: "99.00", description: "Retro clock with an interesting shape", category: "Clocks", …

  useEffect(() => {
    setsubTotalPrice(productQty * cartItem.price);
    dispatch(
      changeProductQuantity({
        product_id: cartItem.id,
        quantity: productQty,
      })
    );
  }, [productQty, cartItem.id, dispatch]);

  const handleRemoveProduct = async () => {
    try {
      await dispatch(
        removeProductFromCart({
          product_id: cartItem.id,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
        <TableCell>
        <img
          className=" hidden sm:block max-h-24 rounded"
          src={cartItem.image_url}
          alt=""
        />
        </TableCell>
      <TableCell>{cartItem.name}</TableCell>
      <TableCell>${cartItem.price}</TableCell>
      <TableCell className="flex items-center mt-8">
        <Button
          size="small"
          layout="outline"
          disabled={productQty === 1}
          onClick={() => setProductQty(productQty - 1)}
        >
          -
        </Button>
        <span className="mr-2 ml-2">{productQty}</span>
        <Button
          size="small"
          layout="outline"
          onClick={() => setProductQty(productQty + 1)}
        >
          +
        </Button>
      </TableCell>
      <TableCell>${subTotalPrice}</TableCell>
      <TableCell>
        <Button layout="Link" onClick={handleRemoveProduct}>
          <span>X</span>
        </Button>
      </TableCell>
    </>
  );
};

export default CartProduct;
