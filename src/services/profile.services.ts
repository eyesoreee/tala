import { Profile } from "@/constants/profile";
import { supabase } from "@/lib/supabase";

function mapProfile(row: {
  id: string;
  display_name: string;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
}): Profile {
  return {
    id: row.id,
    displayName: row.display_name,
    photoUrl: row.photo_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

class ProfileService {
  private async currentUserId() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id ?? null;
  }

  async getCurrentProfile() {
    const userId = await this.currentUserId();
    if (!userId)
      return { data: null, error: { message: "No authenticated user." } };

    const { data, error } = await supabase
      .from("profiles")
      .select("id, display_name, photo_url, created_at, updated_at")
      .eq("id", userId)
      .maybeSingle();

    if (error) return { data: null, error };
    return { data: data ? mapProfile(data) : null, error: null };
  }

  async getById(id: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, display_name, photo_url, created_at, updated_at")
      .eq("id", id)
      .maybeSingle();

    if (error) return { data: null, error };
    return { data: data ? mapProfile(data) : null, error: null };
  }

  async insert(displayName: string, photoUrl: string | null) {
    const userId = await this.currentUserId();
    if (!userId)
      return { data: null, error: { message: "No authenticated user." } };

    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          id: userId,
          display_name: displayName,
          photo_url: photoUrl,
        },
      ])
      .select("id, display_name, photo_url, created_at, updated_at")
      .single();

    if (error) return { data: null, error };
    return { data: mapProfile(data), error: null };
  }

  async update({
    displayName,
    photoUrl,
  }: {
    displayName?: string;
    photoUrl?: string | null;
  }) {
    const userId = await this.currentUserId();
    if (!userId)
      return { data: null, error: { message: "No authenticated user." } };

    const payload: Record<string, unknown> = {};
    if (displayName !== undefined) payload.display_name = displayName;
    if (photoUrl !== undefined) payload.photo_url = photoUrl;

    if (Object.keys(payload).length === 0)
      return { data: null, error: { message: "Nothing to update." } };

    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("id", userId)
      .select("id, display_name, photo_url, created_at, updated_at")
      .maybeSingle();

    if (error) return { data: null, error };
    if (!data) return { data: null, error: { message: "Profile not found." } };
    return { data: mapProfile(data), error: null };
  }

  async deleteAccount() {
    const userId = await this.currentUserId();
    if (!userId)
      return { data: null, error: { message: "No authenticated user." } };

    return supabase.from("profiles").delete().eq("id", userId);
  }
}

export const profileService = new ProfileService();
