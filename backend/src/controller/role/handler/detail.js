const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({});

const getRoleDetail = async (request, h) => {
  const { id } = request.params;
  let response = "";
  let result = "";

  try {
    result = await prisma.role.findFirst({ where: { id: id } });

    if (result != null) {
      response = h.response({
        code: 200,
        status: "OK",
        data: result,
      });
    } else {
      response = h.response({
        code: 404,
        status: "Not Found",
        message: "Role not found",
      });

      response.code(404);
    }

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
  getRoleDetail,
};
