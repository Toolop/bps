const { PrismaClient } = require("@prisma/client");
const { isUserExist } = require("../../../util/user-utils");

const prisma = new PrismaClient({});

const deleteUser = async (request, h) => {
  const { id } = request.params;
  let result = "";
  let response = "";

  try {
    if (await isUserExist(id)) {
      result = await prisma.user.delete({
        where: {
          id: id,
        },
      });

      if (result != null) {
        response = h.response({
          code: 200,
          status: "OK",
          message: "Sensor has been deleted",
        });

        response.code(200);
      } else {
        response = h.response({
          code: 500,
          status: "Internal Server Error",
          message: "Sensor cannot be deleted",
        });

        response.code(500);
      }
    } else {
      response = h.response({
        code: 404,
        status: "Not Found",
        message: "Sensor is not found",
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
  deleteUser,
};
