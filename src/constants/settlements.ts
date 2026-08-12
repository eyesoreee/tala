export interface Settlement {
  id: string;

  familyId: string;

  fromMemberId: string;
  toMemberId: string;

  expenseId: string | null;

  amount: number;

  settledAt: string;

  notes: string | null;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreateSettlementInput {
  fromMemberId: string;
  toMemberId: string;

  expenseId?: string | null;

  amount: number;

  settledAt?: string;

  notes?: string;
}
