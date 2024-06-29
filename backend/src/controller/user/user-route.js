const prefix = require("../../util/prefix.js");
const { addUser } = require("./handler/add.js");
const { deleteUser } = require("./handler/delete.js");
const { getUserDetail } = require("./handler/detail.js");
const { updateUser } = require("./handler/edit.js");
const { getUsers } = require("./handler/get.js");
const { getUser } = require("./handler/getOne.js");

module.exports = [
  {
    method: "POST",
    path: `${prefix}/users`,
    config: { auth: false },
    handler: addUser,
  },
  {
    method: "GET",
    path: `${prefix}/users`,
    config: { auth: false },
    handler: getUsers,
  },
  {
    method: "GET",
    path: `${prefix}/user`,
    config: { auth: "jwt" },
    handler: getUser,
  },
  {
    method: "GET",
    path: `${prefix}/users/{id}`,
    config: { auth: false },
    handler: getUserDetail,
  },
  {
    method: "PUT",
    path: `${prefix}/users/{id}`,
    config: { auth: false },
    handler: updateUser,
  },
  {
    method: "DELETE",
    path: `${prefix}/users/{id}`,
    config: { auth: false },
    handler: deleteUser,
  },
];
