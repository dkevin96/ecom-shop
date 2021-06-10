const express = require("express");
const passport = require("passport");
const Router = require("express-promise-router");
const { products, auth, users, carts } = require("../controllers");

const router = new Router();
router
  //AUTHENTICATE
  .post("/auth/signup", auth.signupUser) //Adds a user and creates a cart for the user
  .post("/auth/login", auth.loginUser) //Logs user in and sends a JWT back in cookie
  .post("/auth/logout", auth.logoutUser) //Deletes httpOnly cookie to logout

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

  // CARTS

  .get(
    "/carts",
    passport.authenticate("jwt-admin", { session: false }),
    carts.getAllCarts
  ) //Gets all products in all carts
  .post(
    "/carts/self",
    passport.authenticate("jwt-customer", { session: false }),
    carts.syncCartSelf
  ) //Gets products in user's cart and syncs with logged out cart
  // .post(
  //   "/carts/self/product",
  //   passport.authenticate("jwt-customer", { session: false }),
  //   carts.postProductInCartSelf
  // ) //Adds a new product to user's cart
  .post(
    "/carts/self/product",
    passport.authenticate("jwt-admin", { session: false }),
    carts.postProductInCartSelf
  ) //Adds a new product to user's cart
  .put(
    "/carts/self/product",
    passport.authenticate("jwt-customer", { session: false }),
    carts.putCartSelf
  ) //Changes quantity of a product in user's cart
  .delete(
    "/carts/self/product",
    passport.authenticate("jwt-customer", { session: false }),
    carts.deleteCartProductSelf
  ); //Deletes a product from user's cart

module.exports = router;
