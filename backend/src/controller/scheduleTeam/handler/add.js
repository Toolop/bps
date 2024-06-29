const { PrismaClient } = require("@prisma/client");

const {
  schduleTeamEntity,
} = require("../../../entities/scheduleTeam/scheduleTeam");

const prisma = new PrismaClient({});

const addScheduleTeam = async (request, h) => {
  const { teamId, scheduleId } = request.payload;
  let result = "";
  let response = "";

  try {
    const newScheduleTeam = schduleTeamEntity(teamId, scheduleId);
    console.log(newScheduleTeam);
    result = await prisma.scheduleTeam.create({
      data: newScheduleTeam,
    });

    response = h.response({
      code: 201,
      status: "Created",
      message: "successfully created schedule",
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
  addScheduleTeam,
};
