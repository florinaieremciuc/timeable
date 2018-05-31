const knex = require('knex')(require('../knexfile'));
const crypto = require('crypto'); // native node package

const randomString = () => crypto.randomBytes(4).toString('hex');
const saltHashPassword = ({ password, salt = randomString() }) => {
  const hash = crypto.createHmac('sha512', salt).update(password);

  return {
    salt,
    hash: hash.digest('hex'),
  };
};

module.exports = {
  createUser({
    username, password, first_name, last_name, email, phone, role, team,
  }) {
    console.log(`Add user ${username}`);
    const { salt, hash } = saltHashPassword({ password });
    return knex('users')
      .insert({
        salt,
        encrypted_password: hash,
        username,
        first_name,
        last_name,
        email,
        phone,
        role,
        team,
      })
      .then(response => response)
      .catch(error => error);
  },
  authenticate({ username, password }) {
    console.log(`Authenticating user ${username}`);
    return knex('users')
      .where({ username })
      .then(([user]) => {
        if (!user) {
          return {
            error: true,
            message: 'Incorrect user or password',
          };
        }
        const { hash } = saltHashPassword({
          password,
          salt: user.salt,
        });
        return { success: hash === user.encrypted_password, user };
      })
      .catch(error => error);
  },
  getAll() {
    console.log('Get users list');
    return knex.select().from('users');
  },
  getTeam(teamid) {
    console.log(`Get team ${teamid} members`);
    return knex
      .select()
      .from('users')
      .where('team', teamid)
      .then((members) => {
        if (!members) return { error: 'Team has no members' };
        return members;
      });
  },
  getOne(id) {
    console.log(`Get user w id ${id}`);
    return knex('users').where('id', id);
  },
  update(id, name) {
    console.log(`Updating user having id ${id} w ${name}`);
    return knex('users')
      .where('id', id)
      .update({
        username: name,
      });
  },
  delete(id) {
    console.log(`Delete user w id ${id}`);
    return knex('users')
      .where('id', id)
      .del();
  },
  // getTeamMembers() {}
};
