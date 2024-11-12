import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, isLoggedInUpdated, selectCurrentUser, selectCurrentUserStatus } from '../features/users/usersSlice';
import { selectNeedsCheckoutRedirect, needsCheckoutRedirectUpdated, selectFetchCurrentCartStatus } from '../features/cart/cartSlice';
import { fetchAllProducts, selectFetchAllProductsStatus } from '../features/products/productsSlice';
import { selectCart, fetchCurrentCart } from '../features/cart/cartSlice';

const SocialApiLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(selectCurrentUser);
  const userStatus = useSelector(selectCurrentUserStatus);
  // const needsCheckoutRedirect = useSelector(selectNeedsCheckoutRedirect)
  const cartContents = useSelector(selectCart);
  const fetchAllProductsStatus = useSelector(selectFetchAllProductsStatus);
  const fetchCurrentCartStatus = useSelector(selectFetchCurrentCartStatus);

  const [loginMsg, setLoginMsg] = useState('');

  //Get user data to redux store after signing in with Google
  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchCurrentUser());
      dispatch(fetchCurrentCart(cartContents));
      // dispatch(fetchCustomerOrders())
      dispatch(fetchAllProducts());
    }
  }, [userStatus, dispatch, history, cartContents]);

  useEffect(() => {
    if (userStatus === 'failed') {
      setLoginMsg('An error occurred logging in using Google.');
    }
  }, [userStatus]);

  //Ask for address if not in the database, otherwise redirect to main site
  useEffect(() => {
    if (
      userStatus === 'succeeded' &&
      fetchAllProductsStatus === 'succeeded' &&
      fetchCurrentCartStatus === 'succeeded'
      // && fetchCustomerOrdersStatus === "succeeded"
    ) {
      dispatch(isLoggedInUpdated(true));
      if (user.address1) {
        //Check if we need to redirect back to checkout process
        history.push('/');
      } else {
        history.push('/social-login/user-register');
      }
    }
  });

  return (
    <div>
      <p className="text-gray-700 font-medium text-base text-center">{loginMsg}</p>
    </div>
  );
};

export default SocialApiLogin;
