const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({});

const getUser = async (id) => {
  let user = {};

  try {
    const result = await prisma.user.findFirst({
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

const isUserExist = async (id) => {
  try {
    const result = await prisma.user.findFirst({
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

module.exports = { getUser, isUserExist };
