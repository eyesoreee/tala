import { Category } from "./enums";

export interface Expense {
  id: string;
  familyId: string;
  createdByMemberId: string;
  paidByMemberId: string;
  title: string;
  amount: number;
  category: Category;
  expenseDate: string;
  reimbursementRequired: boolean;
  notes: string | null;
  receiptUrl: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
