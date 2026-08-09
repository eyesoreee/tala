export const queryKeys = {
  family: (id?: string) => ["family", id] as const,
  familyMembers: (familyId?: string) => ["family-members", familyId] as const,
  expenses: (familyId?: string) => ["expenses", familyId] as const,
};