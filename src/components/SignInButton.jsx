
"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => signIn("github")}
        className="btn btn-primary"
      >
        Sign in with GitHub
      </button>

      <button
        onClick={() => signIn("google")}
        className="btn btn-secondary"
      >
        Sign in with Google
      </button>
    </div>
  );
}
