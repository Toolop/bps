const { PrismaClient } = require("@prisma/client");
const {
  isScheduleExist,
  getSchedules,
} = require("../../../util/schedule-utils");
const {
  schduleUpdateEntity,
} = require("../../../entities/schedule/scheduleUpdate");
const { deleteImage, uploadImage } = require("../../../util/cloudinary");

const prisma = new PrismaClient({});

const updateSchedule = async (request, h) => {
  const { id } = request.params;
  const { name, link, deadline, typeScheduleId } = request.payload;
  let { file } = request.payload;
  let result = "";
  let response = "";

  try {
    if (await isScheduleExist(id)) {
      const getScheduleId = await getSchedules(id);
      const dateDateline = new Date(deadline);
      if (file) {
        if (getScheduleId.file) {
          await deleteImage(getScheduleId.file);
        }
        const uploadImagePayload = await uploadImage("bps", file);
        file = uploadImagePayload.secure_url;
      } else {
        file = getScheduleId.file;
      }
      const newSchedule = schduleUpdateEntity(
        name,
        file,
        link,
        dateDateline,
        parseInt(typeScheduleId)
      );

      result = await prisma.schedule.update({
        where: {
          id: id,
        },
        data: newSchedule,
      });

      if (result != null) {
        response = h.response({
          code: 200,
          status: "OK",
          message: "Schedule has been updated",
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

    response.code(400);
  }

  return response;
};

module.exports = {
  updateSchedule,
};
