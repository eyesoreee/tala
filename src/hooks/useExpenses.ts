import { queryKeys } from "@/lib/query-keys";
import { expenseService } from "@/services/expenses.services";
import { useQuery } from "@tanstack/react-query";

interface UseExpensesOptions {
  enabled?: boolean;
}

export function useExpenses(familyId?: string, options?: UseExpensesOptions) {
  return useQuery({
    queryKey: queryKeys.expenses(familyId),
    queryFn: async () => {
      if (!familyId) throw new Error("Missing family ID");

      const { data, error } = await expenseService.getFamilyExpenses(familyId);

      if (error) throw error;

      return data ?? [];
    },
    enabled: !!familyId && (options?.enabled ?? true),
  });
}