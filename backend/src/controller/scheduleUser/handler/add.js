const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({});

const addScheduleUser = async (request, h) => {
  const { userId, scheduleId } = request.payload;
  let result = "";
  let response = "";

  try {
    result = await prisma.scheduleUser.create({
      data: {
        userId,
        scheduleId,
      },
    });

    response = h.response({
      code: 201,
      status: "Created",
      message: "successfully created schedule",
    });

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
  addScheduleUser,
};
