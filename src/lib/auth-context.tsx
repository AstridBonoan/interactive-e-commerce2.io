"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, getSupabaseConfig } from "@/lib/supabase";

export type UserRole = "customer" | "admin";

export type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
};

type AuthContextValue = {
  enabled: boolean;
  user: AuthUser | null;
  role: UserRole | null;
  isAdmin: boolean;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string, role?: UserRole) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const LOCAL_AUTH_KEY = "bc-atelier-local-auth-v1";

type LocalAccount = {
  id: string;
  email: string;
  password: string;
  role: UserRole;
};

type LocalStore = {
  accounts: LocalAccount[];
  sessionId: string | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function asRole(value: unknown): UserRole {
  return value === "admin" ? "admin" : "customer";
}

function emptyLocal(): LocalStore {
  return { accounts: [], sessionId: null };
}

function readLocal(): LocalStore {
  if (typeof window === "undefined") return emptyLocal();
  try {
    const raw = window.localStorage.getItem(LOCAL_AUTH_KEY);
    if (!raw) return emptyLocal();
    const parsed = JSON.parse(raw) as LocalStore;
    return {
      accounts: parsed.accounts ?? [],
      sessionId: parsed.sessionId ?? null,
    };
  } catch {
    return emptyLocal();
  }
}

function writeLocal(store: LocalStore) {
  window.localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(store));
}

function localUser(store: LocalStore): AuthUser | null {
  const account = store.accounts.find((entry) => entry.id === store.sessionId);
  if (!account) return null;
  return { id: account.id, email: account.email, role: account.role };
}

function userFromSession(session: Session | null): AuthUser | null {
  const user = session?.user;
  if (!user?.email) return null;
  return {
    id: user.id,
    email: user.email,
    role: asRole(user.app_metadata?.role ?? user.user_metadata?.role),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const enabled = getSupabaseConfig().enabled;
  const [session, setSession] = useState<Session | null>(null);
  const [local, setLocal] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setLocal(localUser(readLocal()));
      setLoading(false);
      return;
    }

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const user = enabled ? userFromSession(session) : local;

  const value = useMemo<AuthContextValue>(
    () => ({
      enabled,
      user,
      role: user?.role ?? null,
      isAdmin: user?.role === "admin",
      session,
      loading,
      signIn: async (email, password) => {
        const supabase = getSupabase();
        if (supabase) {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          return error?.message ?? null;
        }

        const store = readLocal();
        const account = store.accounts.find(
          (entry) => entry.email.toLowerCase() === email.trim().toLowerCase(),
        );
        if (!account || account.password !== password) {
          return "Email or password is incorrect.";
        }
        const next = { ...store, sessionId: account.id };
        writeLocal(next);
        setLocal(localUser(next));
        return null;
      },
      signUp: async (email, password, role = "customer") => {
        const nextRole = asRole(role);
        const supabase = getSupabase();
        if (supabase) {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { role: nextRole } },
          });
          return error?.message ?? null;
        }

        const store = readLocal();
        const normalized = email.trim().toLowerCase();
        if (store.accounts.some((entry) => entry.email.toLowerCase() === normalized)) {
          return "An account with that email already exists.";
        }
        const account: LocalAccount = {
          id: `local-${crypto.randomUUID()}`,
          email: email.trim(),
          password,
          role: nextRole,
        };
        const next = {
          accounts: [...store.accounts, account],
          sessionId: account.id,
        };
        writeLocal(next);
        setLocal(localUser(next));
        return null;
      },
      signOut: async () => {
        const supabase = getSupabase();
        if (supabase) {
          await supabase.auth.signOut();
          return;
        }
        const store = readLocal();
        writeLocal({ ...store, sessionId: null });
        setLocal(null);
      },
    }),
    [enabled, loading, local, session, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
