const prefix = require("../../util/prefix.js");
const { getRoleDetail } = require("./handler/detail.js");
const { getRoles } = require("./handler/getAll.js");

module.exports = [
  {
    method: "GET",
    path: `${prefix}/roles`,
    config: { auth: false },
    handler: getRoles,
  },
  {
    method: "GET",
    path: `${prefix}/roles/{id}`,
    config: { auth: false },
    handler: getRoleDetail,
  },
];
