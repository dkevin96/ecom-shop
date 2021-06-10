/*
 * usersService: interact with user database and return the require object
 * cartService: interact with cart database and return the require object
 */
const { usersService, cartsService } = require("../services");
const { fetchAllUsers, fetchUserById, modifyUser, removeUser } = usersService;
const { removeCart, fetchCartById } = cartsService;

const getAllUsers = async (req, res, next) => {
  const users = await fetchAllUsers();
  res.status(200).json(users);
  next();
};

const getUserSelf = async (req, res, next) => {
  const id = req.user.id; //Extract id from passport user object
  const user = await fetchUserById(id);
  res.status(200).json(user);
  next();
};

const putUserSelf = async (req, res, next) => {
  const id = req.user.id; //Extract self user id from passport user object
  const {
    email,
    first_name,
    last_name,
    address1,
    address2,
    postcode,
    city,
    country,
  } = req.body;
  const user = {
    id,
    email,
    first_name,
    last_name,
    address1,
    address2,
    postcode,
    city,
    country,
  };
  await modifyUser(user);
  res.sendStatus(200);
  next();
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const cart = await fetchCartById(id);
  const user = await fetchUserById(id);

  // If there is item in cart then send error
  // Alternativ : cart.length || !user
  if (!user) {
    const error = new Error("Incorrect user");
    return next(error);
  }
  await removeCart(id);
  await removeUser(id);
  res.status(200).json({ msg: "User and cart deleted" });
  next();
};
module.exports = {
  getAllUsers,
  getUserSelf,
  putUserSelf,
  deleteUser,
};
