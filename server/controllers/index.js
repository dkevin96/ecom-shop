const products = require("./products-controller");
const users = require("./users-controller");
const auth = require("./auth-controller");
const carts = require("./carts-controller");

module.exports = {
  products,
  auth,
  users,
  carts,
};
