const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({});

const getUsers = async (request, h) => {
  let { page, size, search } = request.query;
  let response = "";
  let result = "";
  let totalPage = 0;

  try {
    page = page || 1;
    size = size || 10;
    search = search || undefined;

    result = await prisma.user.findMany({
      include: { team: true, role: true },
      orderBy: { createdAt: "desc" },
      where: {
        team: {
          id: search,
        },
      },
      skip: (page - 1) * size,
      take: size,
    });
    const totalRows = await prisma.user.findMany({});
    totalPage = Math.ceil(totalRows.length / size);

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
