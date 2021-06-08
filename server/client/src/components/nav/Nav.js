import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.less";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBolt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Anchor, Drawer, Button } from "antd";
import apiAxios from "../../config/axiosConfig";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  isLoggedInUpdated,
  currentUserUpdated,
  currentUserStatusUpdated,
  selectIsLoggedIn,
} from "../../features/users/usersSlice";
// import { cartProductsUpdated, selectCart } from '../features/cart/cartSlice'
// import { customerOrdersUpdated } from '../features/orders/ordersSlice'

function Nav() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectCurrentUser);

  const handleLogout = async () => {
    try {
      await dispatch(isLoggedInUpdated(false));
      await dispatch(currentUserUpdated({}));
      await dispatch(currentUserStatusUpdated("idle"));
      await apiAxios.post("/auth/logout");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="header">
        <Link to="/">
          <div className="logo">
            <FontAwesomeIcon className="fas fa-bolt" icon={faBolt} />
            <a href="">Bolt</a>
          </div>
        </Link>
        <div className="mobileHidden">
          <Anchor affix={false}>
            <Anchor.Link href="#hero" title="Home" />
            <Anchor.Link href="#about" title="About" />
            <Anchor.Link href="#contact" title="Contact" />
          
            {isLoggedIn && (
              <Link to="/account">
                <Button size="small" type="link">{user.first_name}</Button>
              </Link>
            )}
            {isLoggedIn ? (
              <Link to="/">
                <Button
                  className=" text-center mx-12"
                  onClick={handleLogout}
                  size="small"
                  type="link"
                >
                  Sign Out
                </Button>
              </Link>
                
            ) : (
              <div className="m-2">
                <Link to="/login">
                  <Button
                    className=" text-center mx-12"
                    size="small"
                    type="link"
                  >
                    Sign In / Register
                  </Button>
                </Link>
              </div>
            )}
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <FontAwesomeIcon className="fas" icon={faBars} />
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset="65">
              <Anchor.Link href="#hero" title="Home" />
              <Anchor.Link href="#about" title="About" />
              <Anchor.Link href="#contact" title="Contact" />
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default Nav;
