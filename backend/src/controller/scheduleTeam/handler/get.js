const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({});

const getScheduleTeams = async (request, h) => {
  let response = "";
  let result = "";

  try {
    result = await prisma.scheduleTeam.findMany({
      orderBy: { id: "desc" },
    });

    response = h.response({
      code: 200,
      status: "OK",
      data: result,
    });

    response.code(200);
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
  getScheduleTeams,
};
