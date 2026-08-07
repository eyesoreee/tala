export interface ExpenseShare {
  id: string;
  expenseId: string;
  memberId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
