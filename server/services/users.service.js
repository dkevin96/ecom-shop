const {
  fetchUsersDb,
  fetchUserByIdDb,
  fetchUserByEmailDb,
  createUserDb,
  modifyUserDb,
  removeUserDb,
} = require("../db/users.db");

const fetchAllUsers = async () => {
  return await fetchUsersDb();
};

const fetchUserById = async (id) => {
  return await fetchUserByIdDb(id);
};

const fetchUserByEmail = async (email) => {
  return await fetchUserByEmailDb(email);
};

const createUser = async (user) => {
  return await createUserDb(user);
};

const modifyUser = async (user) => {
  return await modifyUserDb(user);
};

const removeUser = async (id) => {
  return await removeUserDb(id);
};

module.exports = {
  fetchAllUsers,
  fetchUserById,
  fetchUserByEmail,
  createUser,
  modifyUser,
  removeUser,
};
