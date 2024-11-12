import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Elements, CardElement, useElements, useStripe, ElementsConsumer } from '@stripe/react-stripe-js';

import { useHistory } from 'react-router-dom';

import PulseLoader from 'react-spinners/PulseLoader';
import { Button, HelperText } from '@windmill/react-ui';

import apiAxios from '../config/axiosConfig';
import { selectCart, checkoutCart, cartProductsUpdated } from '../features/cart/cartSlice';
import { fetchCustomerOrders } from '../features/orders/ordersSlice';
import { selectAllProducts, selectFetchAllProductsStatus } from '../features/products/productsSlice';

import CheckoutProductList from '../components/checkout/CheckoutProductList';

import Spinner from '../components/spinner/Spinner';
import LayoutHelmet from '../layout/LayoutHelmet';

const CheckOut = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //Stripe payment state
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const products = useSelector(selectAllProducts);
  const cartContents = useSelector(selectCart);
  const fetchStatus = useSelector(selectFetchAllProductsStatus);

  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    if (fetchStatus === 'succeeded') {
      const totalPriceTemp = Object.keys(cartContents).reduce(
        (acc, keyName) => acc + parseFloat(products[keyName].price) * cartContents[keyName].quantity,
        0
      );
      setTotalPrice(totalPriceTemp);
    }
  }, [fetchStatus, dispatch, cartContents]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const fetchData = async () => {
      try {
        const response = await apiAxios.post('/payment/create-payment-intent', {
          items: [{ id: 'order' }],
        });
        console.log(response);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log('not success');
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Stripe styling
  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleSubmit = async ev => {
    const card = elements.getElement(CardElement);
    ev.preventDefault();
    setIsProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setIsProcessing(false);
    } else {
      console.log('succedded');
      setError(null);
      setIsProcessing(false);
      setSucceeded(true);
      try {
        const orderResponse = await dispatch(checkoutCart());
        await dispatch(fetchCustomerOrders()); //Fetch order state after new order placed
        await dispatch(cartProductsUpdated({})); //Clear cart
        const orderId = orderResponse.payload.order_id;
        history.push({
          pathname: `/checkout-done/${orderId}`,
          state: {
            fromCheckoutPage: true,
          },
        });
        console.log(orderResponse);
        console.log('payment success');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = async event => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setError(event.error ? event.error.message : '');
  };

  return (
    <LayoutHelmet loading={fetchStatus !== 'succeeded'}>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold text-center mb-2">Payment details</h1>
          <div className="mt-4">
            <h1 className="text-xl text-center font-medium">Order Summary</h1>
          </div>
          {Object.keys(cartContents).map(keyName => (
            <CheckoutProductList key={keyName} cartItem={products[keyName]} quantity={cartContents[keyName].quantity} />
          ))}
          <p className="text-3xl font-semibold text-right p-2">Total: ${totalPrice}</p>
          <h1 className="font-bold text-2xl text-center">Payment Method</h1>
          <h2 className="font-medium text-xl text-center mb-6">Enter credit card information</h2>
          <p className="text-lg text-gray-500">
            You can use credit card nr 4242424242424242 with any future date, CVC and zip-code for testing. This transaction is just a test and will
            not charge any real money.
          </p>
          <form onSubmit={ev => handleSubmit(ev)}>
            <CardElement className="border py-2" onChange={handleChange} />
            <div className="flex justify-between py-4">
              <Button onClick={() => history.push('/cart')} layout="outline" size="small">
                Back
              </Button>
              <Button disabled={!stripe || isProcessing} type="submit" size="small">
                {isProcessing ? <PulseLoader size={10} color={'#0a138b'} /> : `Pay $${totalPrice}`}
              </Button>
            </div>
          </form>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
    </LayoutHelmet>
  );
};

export default CheckOut;
