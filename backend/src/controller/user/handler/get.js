const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({});

const getUsers = async (request, h) => {
  let { page, size, search, team, role } = request.query;
  let response = "";
  let result = "";
  let totalPage = 0;
  let totalRows;

  try {
    page = page || 1;
    size = size || 10;

    result = await prisma.user.findMany({
      include: { team: true, role: true },
      orderBy: { createdAt: "desc" },
      where: {
        OR: [
          { teamId: team },
          {
            nama: {
              contains: search,
            },
          },
        ],
      },
      skip: (page - 1) * size,
      take: size,
    });

    totalRows = await prisma.user.count({
      where: {
        OR: [
          { teamId: team },
          {
            nama: {
              contains: search,
            },
          },
        ],
      },
    });

    totalPage = Math.ceil(totalRows / size);

    response = h.response({
      code: 200,
      status: "OK",
      data: result,
      pageNow: page,
      allData: totalRows,
      maxPage: totalPage,
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
  getUsers,
};
