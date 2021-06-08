import logo from "./logo.svg";
// import "./App.less";

import { Layout } from "antd";

import { useEffect } from "react";
import Nav from "./components/nav/Nav";
import Nav_tailwind from "./components/nav/Nav_tailwind";
import AppFooter from "./components/Footer";
import Register from "./components/login/Register";
import Login from "./components/login/Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "./components/products/ProductList";
import ProductDetail from "./components/products/ProductDetail";

import { fetchAllProducts } from "./features/products/productsSlice";
import { selectIsLoggedIn } from "./features/users/usersSlice";

const { Header, Content, Footer } = Layout;

const App = () => {
  const dispatch = useDispatch();

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
