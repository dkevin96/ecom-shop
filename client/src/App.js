import { Layout } from "antd";
import { useEffect, Suspense } from "react";
import Nav from "./components/nav/Nav";
import NavTailwind from "./components/nav/NavTailwind";
import AppFooter from "./components/Footer";
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import LayoutHelmet from "./layout/LayoutHelmet";
import ProductList from "./components/products/ProductList";
import ProductDetail from "./components/products/ProductDetail";
import Spinner from "./components/spinner/Spinner";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import CheckOut from "./pages/CheckOut";
import CheckOutDone from "./pages/CheckOutDone";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";

import SocialApiLogin from "./pages/SocialApiLogin";
import SocialUserRegister from "./pages/SocialUserRegister";
// import FacebookLogin from "./pages/GoogleLogin";
// import FacebookUserRegister from "./pages/GoogleUserRegister";

import { fetchAllProducts } from "./features/products/productsSlice";
import { selectIsLoggedIn, fetchAllUser } from "./features/users/usersSlice";
import { selectCustomerOrders, fetchCustomerOrders } from "./features/orders/ordersSlice";

const { Header, Content, Footer } = Layout;
// Cart is from pages, not from component because i decide to restructure

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "pk_test_2Jzc9BD0pnA9IGXZ6mYloPgW00zGp6iRbA");

const App = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCustomerOrders());
  }, [dispatch]);

  return (
    <Elements stripe={promise}>
      <Router>
        <Suspense
          fallback={
            <LayoutHelmet>
              <Spinner size={100} />
            </LayoutHelmet>
          }
        >
          <NavTailwind />

          <div>
            <Content>
              <Switch>
                <Route path="/login" component={Login} />
                <Route exact path="/google-login" component={SocialApiLogin} />
                <Route exact path="/facebook-login" component={SocialApiLogin} />
                <Route exact path="/social-login/user-register" component={SocialUserRegister} />
                <Route path="/register" component={Register} />
                <Route path="/cart" component={Cart} />
                <Route exact path="/checkout">
                  {isLoggedIn ? <CheckOut /> : <Redirect to="/login" />}
                </Route>
                <ProtectedRoute path="/checkout-done/:id" isLoggedIn={isLoggedIn} component={CheckOutDone} />
                <ProtectedRoute path="/admin" isLoggedIn={isLoggedIn} component={Admin} />
                <ProtectedRoute path="/account" isLoggedIn={isLoggedIn} component={Account} />
                <ProtectedRoute exact path="/orders" isLoggedIn={isLoggedIn} component={Orders} />
                <Route path="/product/:id" component={ProductDetail} />
                <Route path="/orders/:id" component={OrderDetail} />
                <Route exact path="/:productOffset?" component={ProductList} />
              </Switch>
            </Content>
          </div>
          <Footer>
            <AppFooter />
          </Footer>
        </Suspense>
      </Router>
    </Elements>
  );
};

export default App;
