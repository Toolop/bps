const Hapi = require("@hapi/hapi");
const dotenv = require("dotenv");
const routes = require("./routes/route");
const jwt = require("hapi-auth-jwt2");
const { validate } = require("./util/jwt-utils");

const init = async () => {
  dotenv.config();

  const server = await Hapi.server({
    port: process.env.PORT || 8000,
    host: process.env.HOST || "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register(jwt);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.JWT_SECRET,
    expiresIn: "365d",
    validate: validate,
  });

  server.auth.default("jwt");

  server.route(routes);

  try {
    await server.start();
  } catch (err) {
    console.log(err);
  }

  console.log(`Server is running on ${server.info.uri}`);
};

init();
