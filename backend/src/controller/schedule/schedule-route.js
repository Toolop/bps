const prefix = require("../../util/prefix.js");
const { addSchedule } = require("./handler/add.js");
const { getAllSchedules } = require("./handler/all.js");
const { deleteSchedule } = require("./handler/delete.js");
const { getScheduleDetail } = require("./handler/detail.js");
const { updateSchedule } = require("./handler/edit.js");
const { getSchedules } = require("./handler/get.js");

module.exports = [
  {
    method: "POST",
    path: `${prefix}/schedules`,
    config: {
      auth: "jwt",
      payload: {
        multipart: true,
        maxBytes: 10485760,
      },
    },
    handler: addSchedule,
  },
  {
    method: "GET",
    path: `${prefix}/schedules`,
    config: { auth: "jwt" },
    handler: getSchedules,
  },
  {
    method: "GET",
    path: `${prefix}/all-schedules`,
    config: { auth: "jwt" },
    handler: getAllSchedules,
  },
  {
    method: "GET",
    path: `${prefix}/schedules/{id}`,
    config: { auth: "jwt" },
    handler: getScheduleDetail,
  },
  {
    method: "PUT",
    path: `${prefix}/schedules/{id}`,
    config: {
      auth: "jwt",
      payload: {
        multipart: true,
        maxBytes: 10485760,
      },
    },
    handler: updateSchedule,
  },
  {
    method: "DELETE",
    path: `${prefix}/schedules/{id}`,
    config: { auth: "jwt" },
    handler: deleteSchedule,
  },
];
