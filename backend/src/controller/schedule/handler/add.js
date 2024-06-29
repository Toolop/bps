const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const { schduleEntity } = require("../../../entities/schedule/schedule");
const { uploadImage } = require("../../../util/cloudinary");

const prisma = new PrismaClient({});

const addSchedule = async (request, h) => {
  let { name, link, deadline, keterangan, startEvent, endEvent } =
    request.payload;
  let { file } = request.payload;
  let result = "";
  let response = "";
  deadline = new Date(deadline).toISOString();

  try {
    if (file) {
      const uploadImagePayload = await uploadImage("bps", file);
      file = uploadImagePayload.secure_url;
    }
    result = await prisma.schedule.create({
      data: {
        id: uuidv4(),
        name,
        file,
        link,
        deadline,
        keterangan,
        startEvent,
        endEvent,
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
  addSchedule,
};
