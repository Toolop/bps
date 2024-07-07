const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({});

const isScheduleUserExist = async (id) => {
  try {
    const result = await prisma.scheduleUser.findFirst({
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

module.exports = { isScheduleUserExist };
