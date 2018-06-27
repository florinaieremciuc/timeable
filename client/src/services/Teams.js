import config from './../config';

/**
 * Call API to create team.
 * @param {String} name
 */
export const createTeam = (name) => {
  const params = { name };
  return fetch(`${config.API_URL}/teams/create_team`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(response => response.json());
};

/**
 * Call API to send invites to team members.
 * @param {Number} team - id
 * @param {String} teamLead - team lead name
 * @param {Array} members - array of members: {email, role}
 */
export const addMembers = (team, teamLead, members) => {
  const params = { team, teamLead, members };
  return fetch(`${config.API_URL}/teams/add_members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
};

/**
 * Call API to get teams.
 */
export const getTeam = teamid =>
  fetch(`${config.API_URL}/teams/${teamid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

export default {
  createTeam,
  addMembers,
  getTeam,
};
