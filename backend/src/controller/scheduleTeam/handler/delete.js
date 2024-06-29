const { PrismaClient } = require("@prisma/client");
const { isScheduleTeamExist } = require("../../../util/scheduleTeam-utils");

const prisma = new PrismaClient({});

const deleteScheduleTeams = async (request, h) => {
  const { id } = request.params;
  let result = "";
  let response = "";

  try {
    if (await isScheduleTeamExist(parseInt(id))) {
      result = await prisma.scheduleTeam.delete({
        where: {
          id: parseInt(id),
        },
      });

      if (result != null) {
        response = h.response({
          code: 200,
          status: "OK",
          message: "Schedule Team has been deleted",
        });

        response.code(200);
      } else {
        response = h.response({
          code: 500,
          status: "Internal Server Error",
          message: "Schedule Team cannot be deleted",
        });

        response.code(500);
      }
    } else {
      response = h.response({
        code: 404,
        status: "Not Found",
        message: "Schedule Team is not found",
      });
      response.code(404);
    }
  } catch (err) {
    response = h.response({
      code: 400,
      status: "Bad Request",
      message: "error",
    });
    response.code(400);
  }

  return response;
};

module.exports = {
  deleteScheduleTeams,
};
