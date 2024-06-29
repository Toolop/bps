const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({});

const getUser = async (request, h) => {
  let { page, size } = request.query;
  let response = "";
  let result = "";
  const { id, role } = request.auth.credentials;

  try {
    page = page || 1;
    size = size || 10;

    result = await prisma.user.findFirst({
      include: {
        role: true,
      },
      where: {
        id: id,
      },
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
  getUser,
};
