import { ExpenseShare } from "@/constants/expense-share";
import { supabase } from "@/lib/supabase";

type ExpenseShareRow = {
  id: string;
  expense_id: string;
  member_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

const expenseShareSelect =
  "id, expense_id, member_id, created_at, updated_at, deleted_at";

function mapExpenseShare(row: ExpenseShareRow): ExpenseShare {
  return {
    id: row.id,
    expenseId: row.expense_id,
    memberId: row.member_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
  };
}

class ExpenseShareService {
  async getExpenseShares(expenseId: string) {
    const { data, error } = await supabase
      .from("expense_shares")
      .select(expenseShareSelect)
      .eq("expense_id", expenseId)
      .is("deleted_at", null)
      .order("created_at", { ascending: true });

    if (error) return { data: null, error };
    return { data: (data ?? []).map(mapExpenseShare), error: null };
  }

  async getMemberShares(memberId: string) {
    const { data, error } = await supabase
      .from("expense_shares")
      .select(expenseShareSelect)
      .eq("member_id", memberId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) return { data: null, error };
    return { data: (data ?? []).map(mapExpenseShare), error: null };
  }

  async getFamilyShares(familyId: string) {
    const { data, error } = await supabase
      .from("expense_shares")
      .select(`${expenseShareSelect}, expenses!inner(family_id)`)
      .eq("expenses.family_id", familyId)
      .is("deleted_at", null)
      .order("created_at", { ascending: true });

    if (error) return { data: null, error };
    return { data: (data ?? []).map(mapExpenseShare), error: null };
  }

  async addMember(expenseId: string, memberId: string) {
    const { data: existing, error: existingError } = await supabase
      .from("expense_shares")
      .select("id")
      .eq("expense_id", expenseId)
      .eq("member_id", memberId)
      .is("deleted_at", null)
      .maybeSingle();

    if (existingError) return { data: null, error: existingError };
    if (existing)
      return {
        data: null,
        error: { message: "Member is already part of this expense." },
      };

    const { data, error } = await supabase
      .from("expense_shares")
      .insert([{ expense_id: expenseId, member_id: memberId }])
      .select(expenseShareSelect)
      .single();

    if (error) return { data: null, error };
    return { data: mapExpenseShare(data), error: null };
  }

  async removeMember(expenseId: string, memberId: string) {
    const { data, error } = await supabase
      .from("expense_shares")
      .update({ deleted_at: new Date().toISOString() })
      .eq("expense_id", expenseId)
      .eq("member_id", memberId)
      .is("deleted_at", null)
      .select("id")
      .maybeSingle();

    if (error) return { data: null, error };
    if (!data)
      return {
        data: null,
        error: { message: "Member is not part of this expense." },
      };
    return { data: true, error: null };
  }
}

export const expenseShareService = new ExpenseShareService();
