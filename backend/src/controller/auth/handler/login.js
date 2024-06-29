const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { generateJwt } = require("../../../util/jwt-utils");
const prisma = new PrismaClient({});

const login = async (request, h) => {
  const { email, password } = request.payload;
  let response = " ";

  try {
    const result = await prisma.user.findFirst({
      include: { role: true },
      where: {
        OR: [
          {
            email: email,
          },
          {
            username: email,
          },
        ],
      },
    });

    if (result != null) {
      if (result.status == 0) {
        response = h.response({
          code: 403,
          status: "Forbidden",
          message: "Call Admin",
        });
        response.code(403);

        return response;
      }
      const hashedPassword = result.password;

      if (await bcrypt.compare(password, hashedPassword)) {
        let accessToken = generateJwt(
          jwt,
          result.id,
          result.username,
          result.email,
          result.role.name,
          result.teamId
        );

        response = h.response({
          code: 200,
          status: "Ok",
          data: {
            accessToken,
            role: result.role.name,
          },
        });
        response.code(200);
      } else {
        response = h.response({
          code: 401,
          status: "Unauthorized",
          message: "Username or password is incorrect",
        });
        response.code(401);
      }
    } else {
      response = h.response({
        code: 401,
        status: "Unauthorized",
        message: "User is not registered.",
      });
      response.code(401);
    }
  } catch (err) {
    console.log(err);
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
  login,
};
