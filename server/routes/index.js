const express = require("express");
const passport = require("passport");
const Router = require("express-promise-router");
const { products } = require("../controllers");

const router = new Router();
router.get("/products", products.getAllProducts);

module.exports = router;
