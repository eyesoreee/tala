import { supabase } from "@/lib/supabase";
import { FamilyMember } from "@/constants/family-member";
import { MemberRole } from "@/constants/enums";

function mapFamilyMember(row: {
  id: string;
  family_id: string;
  user_id: string;
  nickname: string;
  role: MemberRole;
  joined_at: string;
  deleted_at: string | null;
}): FamilyMember {
  return {
    id: row.id,
    familyId: row.family_id,
    userId: row.user_id,
    nickname: row.nickname,
    role: row.role,
    joinedAt: row.joined_at,
    deletedAt: row.deleted_at,
  };
}

class FamilyMemberService {
  async getById(id: string) {
    const { data, error } = await supabase
      .from("family_members")
      .select("id, family_id, user_id, nickname, role, joined_at, deleted_at")
      .eq("id", id)
      .maybeSingle();

    if (error) return { data: null, error };
    return { data: data ? mapFamilyMember(data) : null, error: null };
  }

  async getMemberByUser(familyId: string, userId: string) {
    const { data, error } = await supabase
      .from("family_members")
      .select("id, family_id, user_id, nickname, role, joined_at, deleted_at")
      .eq("family_id", familyId)
      .eq("user_id", userId)
      .is("deleted_at", null)
      .maybeSingle();

    if (error) return { data: null, error };
    return { data: data ? mapFamilyMember(data) : null, error: null };
  }

  async getMembers(familyId: string) {
    const { data, error } = await supabase
      .from("family_members")
      .select("id, family_id, user_id, nickname, role, joined_at, deleted_at")
      .eq("family_id", familyId)
      .is("deleted_at", null)
      .order("joined_at", { ascending: true });

    if (error) return { data: null, error };
    return { data: (data ?? []).map(mapFamilyMember), error: null };
  }

  async update(
    id: string,
    { nickname, role }: { nickname?: string; role?: MemberRole },
  ) {
    const payload: Record<string, unknown> = {};
    if (nickname !== undefined) payload.nickname = nickname;
    if (role !== undefined) payload.role = role;

    if (Object.keys(payload).length === 0)
      return { data: null, error: { message: "Nothing to update." } };

    const { data, error } = await supabase
      .from("family_members")
      .update(payload)
      .eq("id", id)
      .is("deleted_at", null)
      .select("id, family_id, user_id, nickname, role, joined_at, deleted_at")
      .maybeSingle();

    if (error) return { data: null, error };
    if (!data) return { data: null, error: { message: "Member not found." } };
    return { data: mapFamilyMember(data), error: null };
  }

  async remove(id: string) {
    const { data, error } = await supabase
      .from("family_members")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id)
      .is("deleted_at", null)
      .select("id")
      .maybeSingle();

    if (error) return { data: null, error };
    if (!data) return { data: null, error: { message: "Member not found." } };
    return { data: true, error: null };
  }
}

export const familyMemberService = new FamilyMemberService();