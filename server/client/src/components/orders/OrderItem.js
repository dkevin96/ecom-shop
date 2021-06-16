import { Link } from "react-router-dom";

import { Badge, TableCell } from "@windmill/react-ui";
import { format, parseISO } from "date-fns";

const OrderItems = ({ order, orderNr }) => {
  const totalPrice = Object.keys(order).reduce(
    (acc, keyName) =>
      acc +
      parseFloat(order[keyName].price) * parseInt(order[keyName].quantity, 10),
    0
  );

  const quantity = Object.keys(order).reduce(
    (acc, keyName) => acc + parseInt(order[keyName].quantity, 10),
    0
  );

  const orderTime = order[Object.keys(order)[0]].created_at;

  const onclick = () => {
    console.log(order);
  };
  return (
    <>
      <TableCell>#{orderNr}</TableCell>
      <TableCell>{quantity || "Not available"}</TableCell>
      <TableCell>
        <Badge type="success">Success</Badge>{" "}
      </TableCell>
      <TableCell>$ {totalPrice}</TableCell>
      <TableCell>{format(parseISO(orderTime), "dd/MM/yy")}</TableCell>
    </>
  );
};

export default OrderItems;
