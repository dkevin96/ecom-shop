import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addProductToCart,
  changeProductQuantity,
  selectCart,
  productAddedMsgUpdated,
  showProductAddedMsgUpdated,
  removeProductFromCart,
} from "../../features/cart/cartSlice";

import { Card, Col, Row, Button, Divider, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const ProductCard_antd = ({ product }) => {
  const dispatch = useDispatch();

  const cartContents = useSelector(selectCart);
  //Return true if product is already in cart
  const isProductInCart = () => cartContents.hasOwnProperty(product.id);

  const openNotification = () => {
    notification.open({
      style: {
        color: "#1DA57A",
        fontWeight: "bold",
        opacity: 0.9,
        cursor: "pointer",
      },
      placement: "bottomRight",
      message: "Item Added",
      description: `${product.name} is added to your cart.`,
      duration: 2,
    });
  };

  const handleAddToCartClick = async () => {
    try {
      // if product is already in cart then increase quantity by 1
      if (isProductInCart()) {
        dispatch(
          changeProductQuantity({
            product_id: product.id,
            quantity: cartContents[product.id].quantity + 1,
          })
        );
      } else {
        try {
          dispatch(
            addProductToCart({
              product_id: product.id,
              quantity: 1,
            })
          );
        } catch (err) {
          console.log(err);
        }
      }
      openNotification();
      dispatch(productAddedMsgUpdated(`Added ${product.name} to Cart`));
      dispatch(showProductAddedMsgUpdated(true));
    } catch (err) {
      console.log("Failed to add to cart: ", err);
    }
  };

  const handleRemoveProduct = async () => {
    try {
      await dispatch(
        removeProductFromCart({
          product_id: product.id,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  // Disable remove button according to item available in cart
  const disabled = () => {
    if (isProductInCart()) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Col md={8}>
      <Card hoverable>
        <Link to={`/product/${product.id}`}>
          <Card
            style={{ padding: 10 }}
            cover={
              <img
                height="320px"
                width="280px"
                alt="image"
                src={product.image_url}
              />
            }
            bordered={false}
          ></Card>
          {/* Add description make product cards not even */}
          <Card.Meta
            style={{ textAlign: "center" }}
            title={<h2>{product.name}</h2>}
            // description={product.description}
          />
          {/* <br></br> */}
          <Divider orientation="center">Price</Divider>
        </Link>
        <p
          style={{
            lineHeight: "28px",
            fontWeight: "lighter",
            fontSize: "33px",
            color: "#2ecc71",
            textAlign: "center",
          }}
        >
          ${product.price}
        </p>
        <Row
          gutter={[10]}
          className="add-cart-btn-row"
          style={{ justifyContent: "center" }}
        >
          <Col>
            <Button
              title="Add item to cart"
              onClick={handleAddToCartClick}
              type="primary"
            >
              Add to cart
            </Button>
          </Col>
          <Col>
            <Button
              title="Remove item from cart"
              disabled={disabled()}
              onClick={handleRemoveProduct}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ProductCard_antd;
