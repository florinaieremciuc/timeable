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
  createUser({ username, password, first_name, last_name, email, phone }) {
    console.log(`Add user ${username}`);
    const { salt, hash } = saltHashPassword({ password });
    return knex("users").insert({
      salt,
      encrypted_password: hash,
      username,
      first_name,
      last_name,
      email,
      phone
    });
  },
  authenticate({ username, password }) {
    console.log(`Authenticating user ${username}`);
    return knex("users")
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
