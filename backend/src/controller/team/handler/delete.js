const { isTeamExist } = require("../../../util/team-utils");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({});

const deleteTeam = async (request, h) => {
  const { id } = request.params;
  let result = "";
  let response = "";

  try {
    if (await isTeamExist(id)) {
      result = await prisma.team.delete({
        where: {
          id: id,
        },
      });

      if (result != null) {
        response = h.response({
          code: 200,
          status: "OK",
          message: "Team has been deleted",
        });

        response.code(200);
      } else {
        response = h.response({
          code: 500,
          status: "Internal Server Error",
          message: "Team cannot be deleted",
        });

        response.code(500);
      }
    } else {
      response = h.response({
        code: 404,
        status: "Not Found",
        message: "Team is not found",
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
  deleteTeam,
};
