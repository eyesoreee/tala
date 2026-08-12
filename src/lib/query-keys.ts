export const queryKeys = {
  family: (id?: string) => ["family", id] as const,
  familyMembers: (familyId?: string) => ["family-members", familyId] as const,
  expenses: (familyId?: string) => ["expenses", familyId] as const,
  expenseShares: (expenseId?: string) => ["expense-shares", expenseId] as const,
  familyShares: (familyId?: string) => ["family-shares", familyId] as const,
  settlements: (familyId?: string) => ["settlements", familyId] as const,
};
