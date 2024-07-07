const { PrismaClient } = require("@prisma/client");

const bcrypt = require("bcrypt");
const { userEntity } = require("../../../entities/user/user");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient({});

const addUser = async (request, h) => {
  const { username, password, email, nip, ttl, nama, teamId, roleId } =
    request.payload;

  let result = "";
  let response = "";

  try {
    result = await prisma.user.findFirst({
      where: { email: email },
    });

    if (result != null) {
      response = h.response({
        code: 400,
        status: "Conflict",
        message: `${email} already exists.`,
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = userEntity(
        uuidv4(),
        username,
        hashedPassword,
        email,
        nama,
        teamId,
        roleId,
        nip,
        ttl
      );

      result = await prisma.user.create({
        data: newUser,
      });

      response = h.response({
        code: 201,
        status: "Created",
        data: {
          email: email,
        },
      });
    }

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
  addUser,
};
