
import { cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getIssues(userId) {
  "use cache";

  cacheTag(`issues-${userId}`);

  return prisma.issue.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
