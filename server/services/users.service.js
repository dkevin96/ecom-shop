const {
  fetchUsersDb,
  fetchUserByIdDb,
  fetchUserByEmailDb,
  fetchUserByGoogleIdDb,
  addGoogleIdUserDb,
  fetchUserByFacebookIdDb,
  addFacebookIdUserDb,
  createUserDb,
  modifyUserDb,
  removeUserDb,
} = require('../db/users.db');

const fetchAllUsers = async () => {
  return await fetchUsersDb();
};

const fetchUserById = async id => {
  return await fetchUserByIdDb(id);
};

const fetchUserByEmail = async email => {
  return await fetchUserByEmailDb(email);
};

// GOOLE OATH LOGIN
const fetchUserByGoogleId = async id => {
  return await fetchUserByGoogleIdDb(id);
};

const addGoogleIdUser = async user => {
  return await addGoogleIdUserDb(user);
};

// FACEBOOK OATH LOGIN
const fetchUserByFacebookId = async id => {
  return await fetchUserByFacebookIdDb(id);
};

const addFacebookIdUser = async user => {
  return await addFacebookIdUserDb(user);
};

const createUser = async user => {
  return await createUserDb(user);
};

const modifyUser = async user => {
  return await modifyUserDb(user);
};

const removeUser = async id => {
  return await removeUserDb(id);
};

module.exports = {
  fetchAllUsers,
  fetchUserById,
  fetchUserByEmail,
  createUser,
  modifyUser,
  removeUser,
  addGoogleIdUser,
  fetchUserByGoogleId,
  fetchUserByFacebookId,
  addFacebookIdUser,
};
