const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({});

const getAllSchedules = async (request, h) => {
  let { page, size, now, search, status, date } = request.query;
  let response = "";
  let result = "";
  let totalPage = 0;

  try {
    page = parseInt(page) || 1;
    size = parseInt(size) || 10;
    if (now != 0) {
      now = new Date();
    } else {
      now = undefined;
    }
    result = await prisma.schedule.findMany({
      include: {
        scheduleTeam: {
          include: {
            team: true,
          },
        },
        scheduleUser: {
          include: {
            user: true,
          },
        },
      },
      where: {
        deadline: now,
        name: {
          contains: search,
        },
        keterangan: {
          contains: status,
        },
      },
      orderBy: [
        {
          deadline: "desc",
        },
        {
          startEvent: "asc",
        },
      ],
      skip: (page - 1) * size,
      take: size,
    });
    const totalRows = await prisma.schedule.count({
      where: {
        deadline: now,
        name: {
          contains: search,
        },
        keterangan: {
          contains: status,
        },
      },
    });
    totalPage = Math.ceil(totalRows / size);

    if (now == 1) {
      result.map((item, index) => {
        var d = new Date();
        const hourNow = d.getHours();
        const minuteNow = d.getMinutes();
        const hour = item.startEvent.split(":")[0];
        const hourEnd = item.endEvent.split(":")[0];
        const minute = item.startEvent.split(":")[1];
        const minuteEnd = item.endEvent.split(":")[1];
        if (
          hour >= hourNow &&
          minute > minuteNow &&
          hourNow < hourEnd &&
          minuteNow < minuteEnd
        ) {
          item.status = "Sedang Berlangsung";
          item.statusId = 1;
        } else if (hour < hourNow && minute < minuteNow) {
          item.status = "Belum Dimulai";
          item.statusId = 2;
        } else if (hourNow > hourEnd && minuteEnd < minuteNow) {
          item.status = "Selesai";
          item.statusId = 3;
        }
      });
    }

    response = h.response({
      code: 200,
      status: "OK",
      data: result,
      allData: totalRows,
      maxPage: totalPage,
      pageNow: page,
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
  getAllSchedules,
};
