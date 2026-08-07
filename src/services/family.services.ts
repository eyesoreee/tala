import { MemberRole } from "@/constants/enums";
import { Family } from "@/constants/family";
import { supabase } from "@/lib/supabase";

function mapFamily(row: {
  id: string;
  name: string;
  invite_code: string;
  created_at: string;
  updated_at: string;
}): Family {
  return {
    id: row.id,
    name: row.name,
    inviteCode: row.invite_code,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

class FamilyService {
  private async currentUserId() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id ?? null;
  }

  private async getOwnerNickname(userId: string): Promise<string> {
    const { data, error } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", userId)
      .maybeSingle();

    if (error || !data) return "Owner";
    return data.display_name || "Owner";
  }

  async createFamily(name: string) {
    const userId = await this.currentUserId();
    if (!userId)
      return { data: null, error: { message: "No authenticated user." } };

    const { data: family, error: familyError } = await supabase
      .from("families")
      .insert([{ name }])
      .select("id, name, invite_code, created_at, updated_at")
      .single();

    if (familyError) return { data: null, error: familyError };

    const nickname = await this.getOwnerNickname(userId);

    const { error: memberError } = await supabase
      .from("family_members")
      .insert([
        {
          family_id: family.id,
          user_id: userId,
          nickname,
          role: "owner" as MemberRole,
        },
      ]);

    if (memberError) {
      await supabase.from("families").delete().eq("id", family.id);
      return { data: null, error: memberError };
    }

    return { data: mapFamily(family), error: null };
  }

  async joinFamily(inviteCode: string, nickname: string) {
    const userId = await this.currentUserId();
    if (!userId)
      return { data: null, error: { message: "No authenticated user." } };

    const { data: family, error: familyError } = await supabase
      .from("families")
      .select("id, name, invite_code, created_at, updated_at")
      .eq("invite_code", inviteCode.trim().toUpperCase())
      .maybeSingle();

    if (familyError) return { data: null, error: familyError };
    if (!family)
      return { data: null, error: { message: "Invalid invite code." } };

    const { data: existing, error: existingError } = await supabase
      .from("family_members")
      .select("id")
      .eq("family_id", family.id)
      .eq("user_id", userId)
      .is("deleted_at", null)
      .maybeSingle();

    if (existingError) return { data: null, error: existingError };
    if (existing)
      return {
        data: null,
        error: { message: "You are already a member of this family." },
      };

    const { error: memberError } = await supabase
      .from("family_members")
      .insert([
        {
          family_id: family.id,
          user_id: userId,
          nickname,
          role: "member" as MemberRole,
        },
      ]);

    if (memberError) return { data: null, error: memberError };

    return { data: mapFamily(family), error: null };
  }

  async getFamilyById(id: string) {
    const { data, error } = await supabase
      .from("families")
      .select("id, name, invite_code, created_at, updated_at")
      .eq("id", id)
      .maybeSingle();

    if (error) return { data: null, error };
    return { data: data ? mapFamily(data) : null, error: null };
  }

  async getFamilyByInviteCode(inviteCode: string) {
    const { data, error } = await supabase
      .from("families")
      .select("id, name, invite_code, created_at, updated_at")
      .eq("invite_code", inviteCode.trim().toUpperCase())
      .maybeSingle();

    if (error) return { data: null, error };
    return { data: data ? mapFamily(data) : null, error: null };
  }

  async updateFamily(id: string, { name }: { name?: string }) {
    const userId = await this.currentUserId();
    if (!userId)
      return { data: null, error: { message: "No authenticated user." } };

    const payload: Record<string, unknown> = {};
    if (name !== undefined) payload.name = name;

    if (Object.keys(payload).length === 0)
      return { data: null, error: { message: "Nothing to update." } };

    const { data, error } = await supabase
      .from("families")
      .update(payload)
      .eq("id", id)
      .select("id, name, invite_code, created_at, updated_at")
      .maybeSingle();

    if (error) return { data: null, error };
    if (!data) return { data: null, error: { message: "Family not found." } };
    return { data: mapFamily(data), error: null };
  }

  async deleteFamily(id: string) {
    const userId = await this.currentUserId();
    if (!userId)
      return { data: null, error: { message: "No authenticated user." } };

    return supabase.from("families").delete().eq("id", id);
  }

  async leaveFamily(familyId: string) {
    const userId = await this.currentUserId();
    if (!userId)
      return { data: null, error: { message: "No authenticated user." } };

    const { data, error } = await supabase
      .from("family_members")
      .update({ deleted_at: new Date().toISOString() })
      .eq("family_id", familyId)
      .eq("user_id", userId)
      .is("deleted_at", null)
      .select("id")
      .maybeSingle();

    if (error) return { data: null, error };
    if (!data)
      return {
        data: null,
        error: { message: "You are not a member of this family." },
      };
    return { data: true, error: null };
  }
}

export const familyService = new FamilyService();
