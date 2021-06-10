import logo from "./logo.svg";
// import "./App.less";

import { Layout } from "antd";

import { useEffect } from "react";
import Nav from "./components/nav/Nav";
import Nav_tailwind from "./components/nav/Nav_tailwind";
import AppFooter from "./components/Footer";
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "./components/products/ProductList";
import ProductDetail from "./components/products/ProductDetail";

import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Admin from "./pages/Admin";

import { fetchAllProducts } from "./features/products/productsSlice";
import { selectIsLoggedIn, fetchAllUser } from "./features/users/usersSlice";

const { Header, Content, Footer } = Layout;

// Cart is from pages, not from component because i decide to restructure
const App = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Router>
      <Layout className="mainLayout">
        <Header>
          <Nav_tailwind />
        </Header>
        <Content>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/cart" component={Cart} />
            <ProtectedRoute
              path="/admin"
              isLoggedIn={isLoggedIn}
              component={Admin}
            />
            <ProtectedRoute
              path="/account"
              isLoggedIn={isLoggedIn}
              component={Account}
            />
            <Route exact path="/:productOffset?" component={ProductList} />
          </Switch>
        </Content>
        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
