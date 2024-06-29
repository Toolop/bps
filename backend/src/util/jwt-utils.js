const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({});

const validate = async (decoded, request, h) => {
  let isValidated = false;

  try {
    const result = await prisma.user.findFirst({
      where: {
        email: decoded.email,
      },
    });
    if (result != null) {
      isValidated = true;
    } else {
      isValidated = false;
    }
  } catch (err) {
    isValidated = false;
  }
  return { isValid: isValidated };
};

const generateJwt = (jwt, _id_user, _username, _email, _role_name, _team_id) =>
  jwt.sign(
    {
      email: _email,
      id: _id_user,
      username: _username,
      role: _role_name,
      team: _team_id,
    },
    process.env.JWT_SECRET
  );

module.exports = { validate, generateJwt };
