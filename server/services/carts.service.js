const {
  createCartDb,
  fetchCartsDb,
  fetchCartByIdDb,
  removeCartDb,
} = require("../db");

const fetchCarts = async () => {
  return await fetchCartsDb();
};

const fetchCartById = async (userId) => {
  const cartContentsDB = await fetchCartByIdDb(userId);
  //Store product details separately from quantity in the cart array
  const cartContents = cartContentsDB.map((cartObj) => ({
    product: {
      id: cartObj.id,
      name: cartObj.name,
      price: cartObj.price,
      description: cartObj.description,
      image_url: cartObj.image_url,
      status: cartObj.status,
    },
    quantity: cartObj.quantity,
  }));
  return cartContents;
};

const createCart = async (userId) => {
  return await createCartDb(userId);
};

const removeCart = async (userId) => {
  return await removeCartDb(userId);
};
module.exports = {
  createCart,
  fetchCarts,
  fetchCartById,
  removeCart,
};
