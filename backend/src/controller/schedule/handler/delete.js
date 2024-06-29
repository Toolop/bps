const { deleteImage } = require("../../../util/cloudinary");
const {
  isScheduleExist,
  getSchedules,
} = require("../../../util/schedule-utils");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({});

const deleteSchedule = async (request, h) => {
  const { id } = request.params;
  let result = "";
  let response = "";

  try {
    if (await isScheduleExist(id)) {
      const getScheduleId = await getSchedules(id);

      if (getScheduleId.file) {
        await deleteImage(getScheduleId.file);
      }

      result = await prisma.schedule.delete({
        where: {
          id: id,
        },
      });

      if (result != null) {
        response = h.response({
          code: 200,
          status: "OK",
          message: "Schedule has been deleted",
        });

        response.code(200);
      } else {
        response = h.response({
          code: 500,
          status: "Internal Server Error",
          message: "Schedule cannot be deleted",
        });

        response.code(500);
      }
    } else {
      response = h.response({
        code: 404,
        status: "Not Found",
        message: "Schedule is not found",
      });
      response.code(404);
    }
  } catch (err) {
    response = h.response({
      code: 400,
      status: "Bad Request",
      message: "error",
    });
    console.log(err);
    response.code(400);
  }

  return response;
};

module.exports = {
  deleteSchedule,
};
