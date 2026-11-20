
import { cacheLife, cacheTag } from "next/cache";

export async function getDemoIssues() {
  "use cache";

  cacheLife("minutes");
  cacheTag("issues");


  console.log("Fetching demo issues...");

  return [
    {
      id: 1,
      title: "Login page not working",
      status: "Open",
    },
    {
      id: 2,
      title: "Dashboard UI improvement",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Fix API response error",
      status: "Closed",
    },
  ];
}
