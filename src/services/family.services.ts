import { MemberRole } from "@/constants/enums";
import { Family, FamilyDTO } from "@/constants/family";
import { FamilyMemberDTO } from "@/constants/family-member";
import { supabase } from "@/lib/supabase";

interface FamilyMembershipRow {
  role: MemberRole;
  family_id: string;
  families: FamilyDTO | FamilyDTO[] | null;
}

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

  private async ensureCurrentUserProfile(userId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const displayName =
      (user?.user_metadata?.display_name as string | undefined) ?? "New member";

    await supabase
      .from("profiles")
      .upsert({ id: userId, display_name: displayName }, { onConflict: "id" });
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

    await this.ensureCurrentUserProfile(userId);
    const nickname = await this.getOwnerNickname(userId);

    const { data, error } = await supabase.rpc("create_family_and_owner", {
      p_name: name,
      p_nickname: nickname,
    });

    if (error) return { data: null, error };

    const row = Array.isArray(data) ? data[0] : data;
    if (!row)
      return { data: null, error: { message: "Family creation failed." } };

    return { data: mapFamily(row), error: null };
  }

  async joinFamily(inviteCode: string, nickname: string) {
    const userId = await this.currentUserId();
    if (!userId)
      return { data: null, error: { message: "No authenticated user." } };

    await this.ensureCurrentUserProfile(userId);

    const { data, error: resolveError } = await supabase.rpc(
      "resolve_family_by_code",
      { code: inviteCode.trim().toUpperCase() },
    );

    if (resolveError) return { data: null, error: resolveError };

    const family: {
      id: string;
      name: string;
      invite_code: string;
      created_at: string;
      updated_at: string;
    } | null = Array.isArray(data) ? data[0] : data;

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

  async getUserFamilies(userId: string) {
    const { data, error } = await supabase
      .from("family_members")
      .select("role, family_id, families(id, name, invite_code)")
      .eq("user_id", userId)
      .is("deleted_at", null)
      .order("joined_at", { ascending: false });

    if (error) return { data: null, error };

    const families: FamilyMemberDTO[] = (
      (data ?? []) as FamilyMembershipRow[]
    ).map((row) => {
      const family = Array.isArray(row.families)
        ? row.families[0]
        : row.families;
      return {
        id: family?.id ?? row.family_id,
        name: family?.name ?? "Family",
        inviteCode: family?.invite_code ?? "",
        role: row.role,
      };
    });

    return { data: families, error: null };
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
