import { supabase } from "@/lib/supabase";
import { Expense } from "@/constants/expense";
import { Category } from "@/constants/enums";
import { familyMemberService } from "@/services/family-member.services";

type ExpenseRow = {
  id: string;
  family_id: string;
  created_by_member_id: string;
  paid_by_member_id: string;
  title: string;
  amount: number;
  category: Category;
  expense_date: string;
  reimbursement_required: boolean;
  notes: string | null;
  receipt_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

const expenseSelect =
  "id, family_id, created_by_member_id, paid_by_member_id, title, amount, category, expense_date, reimbursement_required, notes, receipt_url, created_at, updated_at, deleted_at";

function mapExpense(row: ExpenseRow): Expense {
  return {
    id: row.id,
    familyId: row.family_id,
    createdByMemberId: row.created_by_member_id,
    paidByMemberId: row.paid_by_member_id,
    title: row.title,
    amount: row.amount,
    category: row.category,
    expenseDate: row.expense_date,
    reimbursementRequired: row.reimbursement_required,
    notes: row.notes,
    receiptUrl: row.receipt_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
  };
}

class ExpenseService {
  private async currentUserId() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id ?? null;
  }

  async getById(id: string) {
    const { data, error } = await supabase
      .from("expenses")
      .select(expenseSelect)
      .eq("id", id)
      .is("deleted_at", null)
      .maybeSingle();

    if (error) return { data: null, error };
    return { data: data ? mapExpense(data) : null, error: null };
  }

  async getFamilyExpenses(familyId: string) {
    const { data, error } = await supabase
      .from("expenses")
      .select(expenseSelect)
      .eq("family_id", familyId)
      .is("deleted_at", null)
      .order("expense_date", { ascending: false });

    if (error) return { data: null, error };
    return { data: (data ?? []).map(mapExpense), error: null };
  }

  async getMemberExpenses(memberId: string) {
    const { data, error } = await supabase
      .from("expenses")
      .select(expenseSelect)
      .eq("paid_by_member_id", memberId)
      .is("deleted_at", null)
      .order("expense_date", { ascending: false });

    if (error) return { data: null, error };
    return { data: (data ?? []).map(mapExpense), error: null };
  }

  async createExpense(input: {
    familyId: string;
    paidByMemberId: string;
    title: string;
    amount: number;
    category: Category;
    expenseDate: string;
    reimbursementRequired: boolean;
    notes?: string | null;
    receiptUrl?: string | null;
  }) {
    const userId = await this.currentUserId();
    if (!userId)
      return { data: null, error: { message: "No authenticated user." } };

    const { data: creator, error: creatorError } =
      await familyMemberService.getMemberByUser(input.familyId, userId);
    if (creatorError) return { data: null, error: creatorError };
    if (!creator)
      return {
        data: null,
        error: { message: "You are not a member of this family." },
      };

    const { data: expense, error: expenseError } = await supabase
      .from("expenses")
      .insert([
        {
          family_id: input.familyId,
          created_by_member_id: creator.id,
          paid_by_member_id: input.paidByMemberId,
          title: input.title,
          amount: input.amount,
          category: input.category,
          expense_date: input.expenseDate,
          reimbursement_required: input.reimbursementRequired,
          notes: input.notes ?? null,
          receipt_url: input.receiptUrl ?? null,
        },
      ])
      .select(expenseSelect)
      .single();

    if (expenseError) return { data: null, error: expenseError };

    const { data: members, error: membersError } =
      await familyMemberService.getMembers(input.familyId);
    if (membersError) {
      await supabase.from("expenses").delete().eq("id", expense.id);
      return { data: null, error: membersError };
    }

    const shareRows = (members ?? []).map((member) => ({
      expense_id: expense.id,
      member_id: member.id,
    }));

    const { error: shareError } = await supabase
      .from("expense_shares")
      .insert(shareRows);

    if (shareError) {
      await supabase.from("expenses").delete().eq("id", expense.id);
      return { data: null, error: shareError };
    }

    return { data: mapExpense(expense), error: null };
  }

  async updateExpense(
    id: string,
    partial: {
      paidByMemberId?: string;
      title?: string;
      amount?: number;
      category?: Category;
      expenseDate?: string;
      reimbursementRequired?: boolean;
      notes?: string | null;
      receiptUrl?: string | null;
    },
  ) {
    const payload: Record<string, unknown> = {};
    if (partial.paidByMemberId !== undefined)
      payload.paid_by_member_id = partial.paidByMemberId;
    if (partial.title !== undefined) payload.title = partial.title;
    if (partial.amount !== undefined) payload.amount = partial.amount;
    if (partial.category !== undefined) payload.category = partial.category;
    if (partial.expenseDate !== undefined)
      payload.expense_date = partial.expenseDate;
    if (partial.reimbursementRequired !== undefined)
      payload.reimbursement_required = partial.reimbursementRequired;
    if (partial.notes !== undefined) payload.notes = partial.notes;
    if (partial.receiptUrl !== undefined) payload.receipt_url = partial.receiptUrl;

    if (Object.keys(payload).length === 0)
      return { data: null, error: { message: "Nothing to update." } };

    const { data, error } = await supabase
      .from("expenses")
      .update(payload)
      .eq("id", id)
      .is("deleted_at", null)
      .select(expenseSelect)
      .maybeSingle();

    if (error) return { data: null, error };
    if (!data) return { data: null, error: { message: "Expense not found." } };
    return { data: mapExpense(data), error: null };
  }

  async deleteExpense(id: string) {
    const deletedAt = new Date().toISOString();

    const { data, error } = await supabase
      .from("expenses")
      .update({ deleted_at: deletedAt })
      .eq("id", id)
      .is("deleted_at", null)
      .select("id")
      .maybeSingle();

    if (error) return { data: null, error };
    if (!data) return { data: null, error: { message: "Expense not found." } };

    const { error: shareError } = await supabase
      .from("expense_shares")
      .update({ deleted_at: deletedAt })
      .eq("expense_id", id)
      .is("deleted_at", null);

    if (shareError) return { data: null, error: shareError };
    return { data: true, error: null };
  }
}

export const expenseService = new ExpenseService();