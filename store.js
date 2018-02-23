module.exports = {
  createUser({ username, password }) {
    console.log(`Add user ${username} w pass ${password}`);
    return Promise.resolve();
  }
};
