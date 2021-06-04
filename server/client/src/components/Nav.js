import { Link } from "react-router-dom";
// import { selectIsLoggedIn } from '../features/users/usersSlice'
import { useDispatch, useSelector } from "react-redux";
// import { isLoggedInUpdated, currentUserUpdated, currentUserStatusUpdated } from '../features/users/usersSlice'
// import { cartProductsUpdated, selectCart } from '../features/cart/cartSlice'
// import { customerOrdersUpdated } from '../features/orders/ordersSlice'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import apiAxios from "./../config/axiosConfig";

function Nav() {
    const dispatch = useDispatch()
    return (
        <div className="bg-black fixed w-full">
            
        </div>
    )
}

export default Nav;
