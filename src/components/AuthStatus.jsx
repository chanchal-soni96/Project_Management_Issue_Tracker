
"use client";

import { useSession } from "next-auth/react";
import SignInButton from "@/components/SignInButton";
import SignOutButton from "@/components/SignOutButton";

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Checking login...</p>;
  }

  if (session) {
    const user = session.user;
    const initials = (user?.name || user?.email || "U")
      .charAt(0)
      .toUpperCase();

    return (
      <div className="auth-status">
        <div className="user-profile">
          {user?.image ? (
            <img
              src={user.image}
              alt="Profile"
              className="profile-avatar"
            />
          ) : (
            <div className="profile-avatar profile-fallback">
              {initials}
            </div>
          )}

          <div className="profile-info">
            <span className="profile-name">
              {user?.name || "User"}
            </span>
            <span className="profile-email">
              {user?.email}
            </span>
          </div>
        </div>

        <SignOutButton />
      </div>
    );
  }

  return <SignInButton />;
}
