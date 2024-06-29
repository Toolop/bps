const prefix = require("../../util/prefix.js");
const { addScheduleTeam } = require("./handler/add.js");
const { deleteScheduleTeams } = require("./handler/delete.js");
const { getScheduleTeamDetail } = require("./handler/detail.js");
const { getScheduleTeams } = require("./handler/get.js");

module.exports = [
  {
    method: "POST",
    path: `${prefix}/schedule-teams`,
    config: {
      auth: false,
    },
    handler: addScheduleTeam,
  },
  {
    method: "GET",
    path: `${prefix}/schedule-teams`,
    config: { auth: false },
    handler: getScheduleTeams,
  },
  {
    method: "GET",
    path: `${prefix}/schedule-teams/{id}`,
    config: { auth: false },
    handler: getScheduleTeamDetail,
  },
  {
    method: "DELETE",
    path: `${prefix}/schedule-teams/{id}`,
    config: { auth: false },
    handler: deleteScheduleTeams,
  },
];
