import { prisma } from "../src/lib/prisma.js";

async function main() {
  const issues = await prisma.issue.findMany();

  console.log("Issues in database:", issues);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });