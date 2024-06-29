const { PrismaClient } = require("@prisma/client");
const { isUserExist } = require("../../../util/user-utils");
const { userEntityUpdate } = require("../../../entities/user/udpateDeleteUser");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient({});

const updateUser = async (request, h) => {
  const { id } = request.params;
  let { username, email, password, nama, teamId, roleId, status } =
    request.payload;
  let result = "";
  let response = "";

  try {
    if (await isUserExist(id)) {
      const existingId = await prisma.user.findMany({
        where: {
          id: id,
        },
      });
      if (username == null || !username) {
        username = existingId.username;
      }
      if (email == null || !email) {
        email = existingId.email;
      }
      if (password == null || !password) {
        password = existingId.password;
      } else {
        password = await bcrypt.hash(password, 10);
      }
      if (nama == null || !nama) {
        nama = existingId.nama;
      }
      if (teamId == null || !teamId) {
        teamId = existingId.teamId;
      }
      if (roleId == null || !roleId) {
        roleId = existingId.roleId;
      }
      if (status != 0 && status != 1) {
        status = existingId.status;
      }

      result = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          username,
          email,
          nama,
          password,
          teamId,
          roleId,
          status,
        },
      });

      if (result != null) {
        response = h.response({
          code: 200,
          status: "OK",
          message: "User has been deleted",
        });

        response.code(200);
      } else {
        response = h.response({
          code: 500,
          status: "Internal Server Error",
          message: "User cannot be deleted",
        });

        response.code(500);
      }
    } else {
      response = h.response({
        code: 404,
        status: "Not Found",
        message: "User is not found",
      });
      response.code(404);
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
  updateUser,
};
