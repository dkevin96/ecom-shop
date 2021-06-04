import logo from "./logo.svg";
import "./App.css";

import { useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <div className="mt-24 flex flex-col flex-grow">
        <Switch>
        <Route exact path="/:productOffset?" component={ProductList} />
        </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
