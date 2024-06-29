const prefix = require("../../util/prefix.js");
const { login } = require("./handler/login.js");

module.exports = [
  {
    method: "POST",
    path: `${prefix}/login`,
    config: { auth: false },
    handler: login,
  },
];
