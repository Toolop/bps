const { PrismaClient } = require("@prisma/client");
const { isScheduleTeamExist } = require("../../../util/scheduleTeam-utils");
const { isScheduleUserExist } = require("../../../util/scheduleUser");

const prisma = new PrismaClient({});

const deleteScheduleUsers = async (request, h) => {
  const { id } = request.params;
  let result = "";
  let response = "";

  try {
    if (await isScheduleUserExist(parseInt(id))) {
      result = await prisma.scheduleUser.delete({
        where: {
          id: parseInt(id),
        },
      });
      console.log(result);

      if (result != null) {
        response = h.response({
          code: 200,
          status: "OK",
          message: "Schedule User has been deleted",
        });

        response.code(200);
      } else {
        response = h.response({
          code: 500,
          status: "Internal Server Error",
          message: "Schedule User cannot be deleted",
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
  deleteScheduleUsers,
};
