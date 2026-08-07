import { supabase } from "@/lib/supabase";

class AuthService {
  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  }

  async signUp(email: string, password: string, displayName: string) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });
  }

  async signOut() {
    return supabase.auth.signOut();
  }

  async getSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error getting session:", error.message);
      return null;
    }

    return data.session;
  }
}

export const authService = new AuthService();
