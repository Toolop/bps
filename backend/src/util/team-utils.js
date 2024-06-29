const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({});

const isTeamExist = async (id) => {
  try {
    const result = await prisma.team.findFirst({
      where: {
        id: id,
      },
    });

    if (result != null) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = { isTeamExist };
