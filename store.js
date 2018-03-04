const knex = require("knex")(require("./knexfile"));
const crypto = require("crypto"); // native node package

const saltHashPassword = ({ password, salt = randomString() }) => {
  const hash = crypto.createHmac("sha512", salt).update(password);

  return {
    salt,
    hash: hash.digest("hex")
  };
};

const randomString = () => {
  return crypto.randomBytes(4).toString("hex");
};

module.exports = {
  createUser({ username, password }) {
    console.log(`Add user ${username}`);
    const { salt, hash } = saltHashPassword({ password });
    return knex("user").insert({
      salt,
      encrypted_password: hash,
      username
    });
  },
  authenticate({ username, password }) {
    console.log(`Authenticating user ${username}`);
    return knex("user")
      .where({ username })
      .then(([user]) => {
        if (!user) return { success: false };
        const { hash } = saltHashPassword({
          password,
          salt: user.salt
        });
        return { success: hash === user.encrypted_password };
      });
  }
};
