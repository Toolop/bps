const prefix = require("../../util/prefix.js");
const { getScheduleType } = require("./handler/get.js");

module.exports = [
  {
    method: "GET",
    path: `${prefix}/schedule-type`,
    config: { auth: false },
    handler: getScheduleType,
  },
];
