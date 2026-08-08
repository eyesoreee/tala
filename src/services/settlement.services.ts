import { CreateSettlementInput, Settlement } from "@/constants/settlements";
import { supabase } from "@/lib/supabase";

type SettlementRow = {
  id: string;
  family_id: string;
  from_member_id: string;
  to_member_id: string;
  amount: number;
  settled_at: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

const settlementSelect =
  "id, family_id, from_member_id, to_member_id, amount, settled_at, notes, created_at, updated_at, deleted_at";

function mapSettlement(row: SettlementRow): Settlement {
  return {
    id: row.id,
    familyId: row.family_id,
    fromMemberId: row.from_member_id,
    toMemberId: row.to_member_id,
    amount: row.amount,
    settledAt: row.settled_at,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
  };
}

class SettlementService {
  async getFamilySettlements(familyId: string) {
    const { data, error } = await supabase
      .from("settlements")
      .select(settlementSelect)
      .eq("family_id", familyId)
      .is("deleted_at", null)
      .order("settled_at", { ascending: true });

    if (error) return { data: null, error };
    return { data: (data ?? []).map(mapSettlement), error: null };
  }

  async recordSettlement(familyId: string, input: CreateSettlementInput) {
    const { data, error } = await supabase.rpc("record_settlement", {
      p_family_id: familyId,
      p_from_member_id: input.fromMemberId,
      p_to_member_id: input.toMemberId,
      p_amount: input.amount,
      p_settled_at: input.settledAt ?? null,
      p_notes: input.notes ?? null,
    });

    if (error) return { data: null, error };

    const row = Array.isArray(data) ? data[0] : data;
    if (!row) return { data: null, error: { message: "Settlement failed." } };

    return { data: mapSettlement(row as SettlementRow), error: null };
  }

  async deleteSettlement(id: string) {
    const { data, error } = await supabase
      .from("settlements")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id)
      .is("deleted_at", null)
      .select("id")
      .maybeSingle();

    if (error) return { data: null, error };
    if (!data)
      return { data: null, error: { message: "Settlement not found." } };
    return { data: true, error: null };
  }
}

export const settlementService = new SettlementService();
