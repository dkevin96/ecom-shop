import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Card, Col, Row, Button, Divider, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const ProductCard_antd = ({ product }) => {
  const dispatch = useDispatch();

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
      duration: 4,
    });
  };

  const handleAddToCartClick = async () => {
    openNotification();
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
          <Card.Meta
            title={<h2>{product.name}</h2>}
            description={product.description}
          />
          <br></br>
          <Divider orientation="center">Price</Divider>
        </Link>
        <p
          style={{
            lineHeight: "28px",
            fontWeight: "lighter",
            fontSize: "46px",
            color: "#2ecc71",
            textAlign: "center",
          }}
        >
          {product.price}
        </p>
        <Row
          gutter={[10]}
          className="add-cart-btn-row"
          style={{ justifyContent: "center" }}
        >
          <Col>
            <Button
              title="Add item to cart"
              //   disabled={
              //     props.cart
              //       ? props.cart.filter((elem) => elem.itemId === props.itemId)
              //           .length
              //       : false
              //   }
              onClick={handleAddToCartClick}
              type="primary"
            >
              Add to cart
            </Button>
          </Col>
          <Col>
            <Button
              title="Remove item from cart"
              //   disabled={
              //     !(props.cart
              //       ? props.cart.filter((elem) => elem.itemId === props.itemId)
              //           .length
              //       : false)
              //   }
              //   onClick={() => props.remove_single(props.itemId)}
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
