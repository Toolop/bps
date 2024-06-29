const { v4: uuidv4 } = require("uuid");

const dataRoles = [
  {
    id: uuidv4(),
    name: "staff",
  },
  {
    id: uuidv4(),
    name: "admin",
  },
  {
    id: uuidv4(),
    name: "tv",
  },
];
module.exports = dataRoles;
