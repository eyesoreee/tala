import { supabase } from "@/lib/supabase";
import { authService } from "@/services/auth.services";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
  session: Session | null;
  initializing: boolean;
  submitting: boolean;
  isPasswordRecovery: boolean;
  signIn(email: string, password: string): Promise<void>;
  signUp(email: string, password: string, displayName: string): Promise<void>;
  signOut(): Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);

  useEffect(() => {
    async function load() {
      const session = await authService.getSession();
      setSession(session);
      setInitializing(false);
    }

    load();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === "PASSWORD_RECOVERY") {
        setIsPasswordRecovery(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(email: string, password: string) {
    setSubmitting(true);
    const { error } = await authService.signIn(email, password);
    setSubmitting(false);
    if (error) Alert.alert("Sign in failed", error.message);
  }

  async function signUp(email: string, password: string, displayName: string) {
    setSubmitting(true);
    const { error } = await authService.signUp(email, password, displayName);
    setSubmitting(false);
    if (error) Alert.alert("Sign up failed", error.message);
  }

  async function signOut() {
    setSubmitting(true);
    const { error } = await authService.signOut();
    setSubmitting(false);
    setIsPasswordRecovery(false);
    if (error) Alert.alert("Sign out failed", error.message);
    else router.replace("/");
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        initializing,
        submitting,
        isPasswordRecovery,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
