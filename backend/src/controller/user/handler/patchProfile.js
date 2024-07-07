const { PrismaClient } = require("@prisma/client");
const { isUserExist } = require("../../../util/user-utils");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient({});

const updateUser = async (request, h) => {
  const { id } = request.params;
  let { photoProfile } = request.payload;
  let result = "";
  let response = "";

  try {
    if (await isUserExist(id)) {
      const existingId = await prisma.user.findMany({
        where: {
          id: id,
        },
      });

      if (photoProfile) {
        const uploadImagePayload = await uploadImage("bps", photoProfile);
        photoProfile = uploadImagePayload.secure_url;
      }

      result = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          photoProfile,
        },
      });

      if (result != null) {
        response = h.response({
          code: 200,
          status: "OK",
          message: "User has been edited",
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
