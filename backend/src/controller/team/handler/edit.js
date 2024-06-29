const { PrismaClient } = require("@prisma/client");
const { isTeamExist } = require("../../../util/team-utils");
const { teamEntityUpdate } = require("../../../entities/team/updateDeleteTeam");

const prisma = new PrismaClient({});

const updateTeam = async (request, h) => {
  const { id } = request.params;
  const { name } = request.payload;
  let result = "";
  let response = "";

  try {
    if (await isTeamExist(id)) {
      const newTeam = teamEntityUpdate(name);

      result = await prisma.team.update({
        where: {
          id: id,
        },
        data: newTeam,
      });

      if (result != null) {
        response = h.response({
          code: 200,
          status: "OK",
          message: "Team has been updated",
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
  updateTeam,
};
