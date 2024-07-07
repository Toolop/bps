const prefix = require("../../util/prefix.js");
const { deleteScheduleUsers } = require("./handler/delete.js");
const { getScheduleUserDetail } = require("./handler/detail.js");
const { getScheduleUsers } = require("./handler/get.js");
const { addScheduleUser } = require("./handler/add.js");

module.exports = [
  {
    method: "POST",
    path: `${prefix}/schedule-users`,
    config: {
      auth: false,
    },
    handler: addScheduleUser,
  },
  {
    method: "GET",
    path: `${prefix}/schedule-users`,
    config: { auth: false },
    handler: getScheduleUsers,
  },
  {
    method: "GET",
    path: `${prefix}/schedule-users/{id}`,
    config: { auth: false },
    handler: getScheduleUserDetail,
  },
  {
    method: "DELETE",
    path: `${prefix}/schedule-users/{id}`,
    config: { auth: false },
    handler: deleteScheduleUsers,
  },
];
