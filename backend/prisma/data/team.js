const { v4: uuidv4 } = require("uuid");

const dataTeams = [
  {
    id: uuidv4(),
    name: "IT",
  },
  {
    id: uuidv4(),
    name: "TEST",
  },
];
module.exports = dataTeams;
