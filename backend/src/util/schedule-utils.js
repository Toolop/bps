const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({});

const getSchedules = async (id) => {
  let user = {};

  try {
    const result = await prisma.schedule.findFirst({
      where: {
        id: id,
      },
    });

    if (result != null) {
      user = result;
    }
  } catch (err) {
    console.log(err);
  }

  return user;
};

const isScheduleExist = async (id) => {
  try {
    const result = await prisma.schedule.findFirst({
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
  }
};

module.exports = { getSchedules, isScheduleExist };
