const prefix = require("../../util/prefix.js");
const { addTeam } = require("./handler/add.js");
const { getTeamDetail } = require("./handler/detail.js");
const { updateTeam } = require("./handler/edit.js");
const { getTeams } = require("./handler/get.js");
const { deleteTeam } = require("./handler/delete.js");

module.exports = [
  {
    method: "POST",
    path: `${prefix}/teams`,
    config: { auth: false },
    handler: addTeam,
  },
  {
    method: "GET",
    path: `${prefix}/teams`,
    config: { auth: false },
    handler: getTeams,
  },
  {
    method: "GET",
    path: `${prefix}/teams/{id}`,
    config: { auth: false },
    handler: getTeamDetail,
  },
  {
    method: "PUT",
    path: `${prefix}/teams/{id}`,
    config: { auth: false },
    handler: updateTeam,
  },
  {
    method: "DELETE",
    path: `${prefix}/teams/{id}`,
    config: { auth: false },
    handler: deleteTeam,
  },
];
