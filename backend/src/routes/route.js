const userRoute = require("../controller/user/user-route");
const teamRoute = require("../controller/team/team-route");
const roleRoute = require("../controller/role/role-route");
const authRoute = require("../controller/auth/auth-route");
const scheduleRoute = require("../controller/schedule/schedule-route");
const scheduleTeamRoute = require("../controller/scheduleTeam/scheduleTeam-route");
const scheduleType = require("../controller/scheduleType/scheduleType");

const routes = [].concat(
  userRoute,
  teamRoute,
  roleRoute,
  authRoute,
  scheduleRoute,
  scheduleTeamRoute,
  scheduleType
);

module.exports = routes;
