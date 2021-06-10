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
const syncCartSelf = async (req, res, next) => {
  const userId = req.user.id; // Extract user id from passport user object
  const cartId = req.user.cart_id; // Extract user id from passport user object

  const dbCart = await fetchCartById(userId);
  const loggedOutCart = req.body.cart;

  for (const productId in loggedOutCart) {
    // if not found dbcart.some return false
    if (!dbCart.some((item) => item.product.id == productId)) {
      const cartProduct = {
        cart_id: cartId,
        product_id: productId,
        quantity: loggedOutCart[productId].quantity,
      };
      await createProductInCart(cartProduct);
    }
  }

  const newCart = await fetchCartById(userId);
  res.status(200).json(newCart);
  next();
};

// Create product in cart
const postProductInCartSelf = async (req, res, next) => {
  const cartId = req.user.cart_id; // extract from passport user object
  const { product_id, quantity } = req.body;
  const cartProduct = {
    cart_id: cartId,
    product_id,
    quantity,
  };
  await createProductInCart(cartProduct);
  res.status(201).send('Product created');
  next();
};

// modify quantity
const putCartSelf = async (req, res, next) => {
  const cartId = req.user.cart_id;
  const { product_id, quantity } = req.body;
  const updateCartProduct = {
    cart_id: cartId,
    product_id,
    quantity,
  };
  const newCart = await modifyCart(updateCartProduct);
  res.status(200).json(newCart);
  next();
};

// Delete product in cart
const deleteCartProductSelf = async (req, res, next) => {
  const cartId = req.user.cart_id;
  const { product_id } = req.body;
  const cartProduct = {
    cart_id: cartId,
    product_id,
  };
  const deleted = await removeCartProduct(cartProduct);
  res.status(200).json(deleted);
  next();
};

module.exports = {
  getAllCarts,
  syncCartSelf,
  postProductInCartSelf,
  putCartSelf,
  deleteCartProductSelf,
  // checkoutCart
};
