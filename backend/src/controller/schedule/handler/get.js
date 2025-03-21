const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({});

const getSchedules = async (request, h) => {
  let { page, size, now } = request.query;
  let response = "";
  let result = "";
  let totalPage = 0;
  const { team } = request.auth.credentials;
  const { id } = request.auth.credentials;

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
        OR: [
          {
            scheduleTeam: {
              some: { teamId: team },
            },
          },
          {
            scheduleUser: {
              some: { userId: id },
            },
          },
        ],
        where: {
          deadline: now,
          name: {
            contains: search,
          },
          keterangan: {
            contains: status,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * size,
      take: size,
    });
    const totalRows = await prisma.schedule.count({});
    totalPage = Math.ceil(totalRows / size);

    if (now != 0) {
      result.map((item, index) => {
        var d = new Date();
        const hourNow = parseInt(d.getHours());
        const minuteNow = parseInt(d.getMinutes());
        const hour = parseInt(item.startEvent.split(":")[0]);
        const hourEnd = parseInt(item.endEvent.split(":")[0]);
        const minute = parseInt(item.startEvent.split(":")[1]);
        const minuteEnd = parseInt(item.endEvent.split(":")[1]);
        if (hourNow >= hour && hourNow <= hourEnd) {
          if (minuteNow < minute && hourNow == hour) {
            item.status = "Belum Dimulai";
            item.statusId = 2;
          } else if (minuteNow > minuteEnd && hourNow == hourEnd) {
            item.status = "Selesai";
            item.statusId = 3;
          } else {
            item.status = "Sedang Berlangsung";
            item.statusId = 1;
          }
        } else if (hourNow < hour) {
          item.status = "Belum Dimulai";
          item.statusId = 2;
        } else if (hourNow > hourEnd) {
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
  getSchedules,
};
