"use client";

import { StoreHeader } from "@/components/store/StoreChrome";
import { useAuth, type UserRole } from "@/lib/auth-context";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const { signIn, signUp, user, isAdmin, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [message, setMessage] = useState<string | null>(null);

  return (
    <main className="page-shell">
      <StoreHeader />
      <div className="panel-card max-w-lg space-y-3">
        <h1 className="display-title text-4xl">Sign in</h1>
        {user ? (
          <div className="space-y-3">
            <p>
              Signed in as {user.email}
              <span className="text-[var(--ink-soft)]"> · {user.role}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="ink-button" href="/account/">
                Account
              </Link>
              {isAdmin ? (
                <Link className="ink-button-solid" href="/cms/">
                  Content Management
                </Link>
              ) : null}
              <button className="ink-button" onClick={() => void signOut()}>
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <>
            <input
              className="ink-input w-full"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="ink-input w-full"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold">Account type</legend>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={role === "customer" ? "ink-button-solid" : "ink-button"}
                  onClick={() => setRole("customer")}
                >
                  Customer
                </button>
                <button
                  type="button"
                  className={role === "admin" ? "ink-button-solid" : "ink-button"}
                  onClick={() => setRole("admin")}
                >
                  Admin
                </button>
              </div>
              <p className="text-sm text-[var(--ink-soft)]">
                Used when you create an account. Admin opens the content manager from Account.
              </p>
            </fieldset>
            {message ? <p className="text-sm">{message}</p> : null}
            <div className="flex gap-3">
              <button
                className="ink-button-solid"
                onClick={async () => setMessage((await signIn(email, password)) ?? "Welcome back.")}
              >
                Sign in
              </button>
              <button
                className="ink-button"
                onClick={async () =>
                  setMessage((await signUp(email, password, role)) ?? "Account created.")
                }
              >
                Create account
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
