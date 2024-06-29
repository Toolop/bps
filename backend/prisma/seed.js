const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const dataTeams = require("./data/team");
const dataRoles = require("./data/role");

const prisma = new PrismaClient();

async function main() {
  const teamInsert = await prisma.team.createMany({
    data: dataTeams,
    skipDuplicates: true,
  });
  const roleInsert = await prisma.role.createMany({
    data: dataRoles,
    skipDuplicates: true, // Skip 'Bobo'
  });
  const typeSchedule = await prisma.typeSchedule.createMany({
    data: [{ name: "offline" }, { name: "onlline" }],
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    teamInsert,
    roleInsert,
    typeSchedule,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
