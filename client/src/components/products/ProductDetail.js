import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById, selectFetchAllProductsStatus } from '../../features/products/productsSlice';
import {
  selectCart,
  addProductToCart,
  removeProductFromCart,
  changeProductQuantity,
  productAddedMsgUpdated,
  showProductAddedMsgUpdated,
} from '../../features/cart/cartSlice';

import LayoutHelmet from '../../layout/LayoutHelmet';

import { Card, Col, Row, Button, Divider, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const ProductDetail = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => selectProductById(state, id));
  const cartContents = useSelector(selectCart);
  const productsStatus = useSelector(selectFetchAllProductsStatus);

  //Return true if product is already in cart
  const isProductInCart = () => cartContents.hasOwnProperty(product.id);

  const openNotification = () => {
    notification.open({
      style: {
        color: '#1DA57A',
        fontWeight: 'bold',
        opacity: 0.9,
        cursor: 'pointer',
      },
      placement: 'bottomRight',
      message: 'Item Added',
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
      console.log('Failed to add to cart: ', err);
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
    <>
      {productsStatus === 'succeeded' ? (
        <LayoutHelmet>
          <section className="body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img
                  src={product?.image_url}
                  alt={product?.name}
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-contain md:object-cover object-center rounded"
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h1 className="text-3xl title-font font-medium mb-1">{product?.name}</h1>
                  <p className="leading-relaxed pb-6 border-b-2 border-gray-800">{product?.description}</p>
                  <div className="flex mt-4 ">
                    <span className="title-font font-medium text-2xl">${product?.price}</span>
                    <Button className="ml-auto border-0 focus:outline-none rounded" onClick={handleAddToCartClick} type="primary">
                      Add to cart
                    </Button>
                    <Button className="ml-4" title="Remove item from cart" disabled={disabled()} onClick={handleRemoveProduct} type="primary" danger>
                      <DeleteOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </LayoutHelmet>
      ) : (
        <LayoutHelmet loading={true}></LayoutHelmet>
      )}
    </>
  );
};

export default ProductDetail;
