const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({});

const getTeams = async (request, h) => {
  let { page, size, search } = request.query;
  let response = "";
  let result = "";
  let totalPage = 0;

  try {
    page = parseInt(page) || 1;
    size = parseInt(size) || 10;
    search = search || undefined;

    result = await prisma.team.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * size,
      take: size,
    });

    const totalRows = await prisma.team.count({});
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
  getTeams,
};
