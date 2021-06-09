const { cartsService } = require("../services");
const {
  fetchCarts,
  fetchCartById,
  createProductInCart,
  modifyCart,
  removeCartProduct,
} = cartsService;

const getAllCarts = async (req, res, next) => {
  const carts = await fetchCarts();
  res.status(200).json(carts);
  next();
};

// Gets cart from db, adds items from logged-out cart, and sends updated cart back
const syncCartSelf = async (req, res, nest) => {
  const userId = req.user.id; // Extract user id from passport user object
  const cartId = req.user.cart_id; // Extract user id from passport user object

  const dbCart = await fetchCartById(userId);
  const loggedOutCart = req.body.cart;

  // for(const productId in loggedOutCart)
};
