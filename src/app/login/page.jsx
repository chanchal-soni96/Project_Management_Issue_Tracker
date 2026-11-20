
import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignInButton from "@/components/SignInButton";

async function LoginContent() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">IT</div>
          <h1>Issue Tracker</h1>
          <p>Stay organized. Resolve issues faster.</p>
        </div>

        <div className="login-divider" />

        <div className="login-content">
          <h2>Welcome back!</h2>
          <p>Sign in to manage and track your development issues.</p>

          <SignInButton />
        </div>

        <div className="login-footer">
          Secure authentication powered by GitHub and Google.
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<p>Loading login page...</p>}>
      <LoginContent />
    </Suspense>
  );
}
