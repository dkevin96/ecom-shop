import React, { useEffect, useState } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOrderById,
  fetchCustomerOrders,
  selectFetchCustomerOrdersStatus,
} from "../features/orders/ordersSlice";
import { selectProductById, selectAllProducts } from "../features/products/productsSlice";
import { Badge, Card, CardBody } from "@windmill/react-ui";
import { format, parseISO } from "date-fns";
import LayoutHelmet from "../layout/LayoutHelmet";
const OrderDetail = () => {
  const fetchStatus = useSelector(selectFetchCustomerOrdersStatus);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [orderTime, setOrderTime] = useState();

  const { id } = useParams();
  const { state } = useLocation();
  const history = useHistory();
  const order = useSelector((state) => selectOrderById(state, id));
  

   const products = useSelector(selectAllProducts)
  
  useEffect(() => {
    if (!state?.orderNr || fetchStatus !== "succeeded") {
      console.log("Must access orders page before.");
      history.push("/");
    } else {
      const totalPrice = Object.keys(order).reduce(
        (acc, keyName) =>
          acc +
          parseFloat(order[keyName].price) *
            parseInt(order[keyName].quantity, 10),
        0
      );

      const quantity = Object.keys(order).reduce(
        (acc, keyName) => acc + parseInt(order[keyName].quantity, 10),
        0
      );

      const orderTime = order[Object.keys(order)[0]].created_at;
      const time = format(parseISO(orderTime), "dd/MM/yy");
      setTotalPrice(totalPrice);
      setQuantity(quantity);
      setOrderTime(time);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchCustomerOrders());
  }, []);

//   const onclick = () => {
//     console.log(products[11]);
//   };

  return (
    <>
      {fetchStatus === "succeeded" ? (
        <LayoutHelmet>
          {/* <button onClick={onclick}>click</button> */}
          <div className="my-4">
            <h1 className="font-bold text-2xl">Order Details</h1>
            <p>Order no: #{id}</p>
            <p>{`${quantity || "Not available"} items`}</p>
            <p>
              Status: <Badge type="success">Success</Badge>
            </p>
            <p>Total Amount: ${totalPrice}</p>
            <p>Placed on: {orderTime}</p>
            <div className="border-t-2">
              <h1 className="font-bold text-xl">Items in your order</h1>
              {Object.keys(order).map((productId) => (
                <Card key={id} className="flex my-4 p-2 md:flex-row flex-col">
                  <img
                      className="sm:w-full md:w-1/2 lg:w-1/3 object-contain md:object-cover"
                      loading="lazy"
                      decoding="async"
                      src={products[order[productId].product_id].image_url}
                      alt={products[order[productId].product_id].name}
                    />
                  <CardBody>
                    <h1 className="font-semibold text-gray-600">
                      {order[productId].name}
                    </h1>
                    <p className="mb-2">
                      ${" "}
                      {parseFloat(order[productId].price) *
                        parseInt(order[productId].quantity, 10)}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {products[order[productId].product_id].description}
                    </p>
                    <p className="mt-2">
                      Quantity: {order[productId].quantity}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </LayoutHelmet>
      ) : (
        <LayoutHelmet loading={true}></LayoutHelmet>
      )}
    </>
  );
};

export default OrderDetail;
