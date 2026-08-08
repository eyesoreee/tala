import { supabase } from "@/lib/supabase";
import { profileService } from "./profile.services";

class AuthService {
  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  }

  async signUp(email: string, password: string, displayName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) return { data, error };

    if (!data.user) {
      return {
        data,
        error: { message: "Account was created, but no user was returned." },
      };
    }

    const { error: profileError } = await profileService.insert(
      displayName,
      null,
    );

    if (profileError) {
      return {
        data,
        error: profileError,
      };
    }

    return { data, error: null };
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
