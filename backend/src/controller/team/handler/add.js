const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const { teamEntity } = require("../../../entities/team/team");

const prisma = new PrismaClient({});

const addTeam = async (request, h) => {
  const { name } = request.payload;

  let result = "";
  let response = "";

  try {
    const newTeam = teamEntity(uuidv4(), name);

    result = await prisma.team.create({
      data: newTeam,
    });

    response = h.response({
      code: 201,
      status: "Created",
      message: "successfully",
    });

    response.code(201);
  } catch (err) {
    response = h.response({
      code: 400,
      status: "Bad Request",
      message: "error",
    });

    response.code(400);

    console.log(err);
  }
  return response;
};

module.exports = {
  addTeam,
};
