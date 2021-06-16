const express = require("express");
const passport = require("passport");
const Router = require("express-promise-router");
const {
  products,
  auth,
  users,
  carts,
  payment,
  orders,
} = require("../controllers");

const router = new Router();
router
  //AUTHENTICATE
  .post("/auth/signup", auth.signupUser) //Adds a user and creates a cart for the user
  .post("/auth/login", auth.loginUser) //Logs user in and sends a JWT back in cookie
  .post("/auth/logout", auth.logoutUser) //Deletes httpOnly cookie to logout

  // Google login
  .get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  )
  //Logs user in using Google Oauth and issues a JWT back in cookie
  .get(
    "/auth/google/redirect",
    passport.authenticate("google", { session: false }),
    auth.loginGoogle
  )

  .get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["email"],
      session: false,
    })
  )
  //Logs user in using Facebook Oauth and issues a JWT back in cookie
  .get(
    "/auth/facebook/redirect",
    passport.authenticate("facebook", { session: false }),
    auth.loginFacebook
  )
  // PRODUCTS
  .get("/products", products.getAllProducts)

  // USER
  .get(
    "/users",
    passport.authenticate("jwt-admin", { session: false }),
    users.getAllUsers
  )
  .get(
    "/users/self",
    passport.authenticate("jwt-customer", { session: false }),
    users.getUserSelf
  ) //Customer can access their user info
  .put(
    "/users/self",
    passport.authenticate("jwt-customer", { session: false }),
    users.putUserSelf
  ) //Customer can edit their user info
  .delete(
    "/users/:id",
    passport.authenticate("jwt-admin", { session: false }),
    users.deleteUser
  ) //Delete user and associated cart

  //-------------------- CARTS----------------------------------------------

  //Gets all products in all carts
  .get(
    "/carts",
    passport.authenticate("jwt-admin", { session: false }),
    carts.getAllCarts
  )

  //Gets products in user's cart and syncs with logged out cart
  .post(
    "/carts/self",
    passport.authenticate("jwt-customer", { session: false }),
    carts.syncCartSelf
  )

  //Adds a new product to user's cart
  .post(
    "/carts/self/product",
    passport.authenticate("jwt-customer", { session: false }),
    carts.postProductInCartSelf
  )

  //Changes quantity of a product in user's cart
  .put(
    "/carts/self/product",
    passport.authenticate("jwt-customer", { session: false }),
    carts.putCartSelf
  )

  //Deletes a product from user's cart
  .delete(
    "/carts/self/product",
    passport.authenticate("jwt-customer", { session: false }),
    carts.deleteCartProductSelf
  )

  //Checks out a user's cart and places an order
  .post(
    "/carts/self/checkout",
    passport.authenticate("jwt-customer", { session: false }),
    carts.checkoutCart
  )
  .post(
    "/payment/create-payment-intent",
    passport.authenticate("jwt-customer", { session: false }),
    payment.createPaymentIntent
  )

  //-------------------- Order----------------------------------------------
  //Gets all orders for all users
  .get(
    "/orders",
    passport.authenticate("jwt-admin", { session: false }),
    orders.getAllOrders
  )

  //Gets all orders for current user
  .get(
    "/orders/self",
    passport.authenticate("jwt-customer", { session: false }),
    orders.getOrdersSelf
  )

  //Gets one order
  .get(
    "/orders/review/:orderId",
    passport.authenticate("jwt-admin", { session: false }),
    orders.getOrderById
  );

module.exports = router;
