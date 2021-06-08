import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.less";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBolt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
// import { Anchor, Drawer, Button } from "antd";
import { Badge, Button, Dropdown, DropdownItem } from "@windmill/react-ui";
import { LogOut, ShoppingCart, User } from "react-feather";
import { Transition } from "@windmill/react-ui";

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

function Nav_tailwind() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <nav className="flex items-center justify-between px-2 lg:px-36 py-2 shadow-lg fixed w-full bg-white top-0 z-10">
      <Link
        to="/"
        className="text-gray-700 text-2xl font-bold dark:text-gray-400"
      >
        <div className="logo">
        <a href="">Bolt</a>
          <FontAwesomeIcon className="fas fa-bolt" icon={faBolt} />
        </div>
      </Link>

      <ul className="flex space-x-4">
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login">
                <Button layout="link">
                  <span>Login</span>
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <Button layout="link">
                  <span className="lg:block hidden">Cart</span>
                  <ShoppingCart className="lg:hidden" />
                  <Badge className="ml-2" type="danger">
                    {/* {cartTotal} */}
                  </Badge>{" "}
                </Button>
              </Link>
            </li>
          </>
        )}

        {isLoggedIn && (
          <>
            <li>
              <Link to="/cart">
                <Button layout="link">
                  <span className="lg:block hidden">Cart</span>
                  <ShoppingCart className="lg:hidden" />
                  <Badge className="ml-2" type="danger">
                    {/* {cartTotal} */}
                  </Badge>{" "}
                </Button>
              </Link>
            </li>
            <li className="relative">
              <Button
                layout="link"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="lg:block hidden">Account</span>
                <User className="lg:hidden" />
              </Button>
              <Transition
                show={isDropdownOpen}
                enter="transition ease-out duration-150 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dropdown
                  align="right"
                  isOpen={isDropdownOpen}
                  className="z-10"
                >
                  <DropdownItem className="cursor-not-allowed text-gray-400 border-b flex flex-col items-start justify-start">
                    <p className="self-start">{user.first_name}</p>
                    <p className="self-start">@{user.email}</p>
                  </DropdownItem>
                  <DropdownItem tag="a">
                    <Link className="w-full" to="/account">
                      Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem tag="a">
                    <Link className="w-full" to="/orders">
                      Orders
                    </Link>
                  </DropdownItem>
                  <DropdownItem tag="a" className="border-t">
                    <Link
                      className="w-full"
                      onClick={() => handleLogout()}
                      to="/login"
                    >
                      <Button iconRight={LogOut} block>
                        Logout
                      </Button>
                    </Link>
                  </DropdownItem>
                </Dropdown>
              </Transition>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav_tailwind;
