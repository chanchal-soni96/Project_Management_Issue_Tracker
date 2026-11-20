import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import IssueDashboardClient from "@/components/IssueDashboardClient";
import AuthStatus from "@/components/AuthStatus";
import { getIssues } from "@/lib/issues";
import { connection } from "next/server";

async function HomeContent() {
  await connection();

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const issues = await getIssues(session.user.id);

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo">IT</div>
          <div>
            <h1>Issue Tracker</h1>
            <p>Manage, track and resolve your development issues.</p>
          </div>
        </div>

        <div className="header-user">
          <AuthStatus />
        </div>
      </header>

      <div className="dashboard-grid">
        <IssueDashboardClient initialIssues={issues} />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<p>Checking authentication...</p>}>
      <HomeContent />
    </Suspense>
  );
}
