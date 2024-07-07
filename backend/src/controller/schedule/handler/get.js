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

        deadline: now,
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * size,
      take: size,
    });
    const totalRows = await prisma.schedule.count({});
    totalPage = Math.ceil(totalRows / size);

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
