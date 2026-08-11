import { queryKeys } from "@/lib/query-keys";
import { expenseShareService } from "@/services/expense-share.services";
import { useQuery } from "@tanstack/react-query";

export function useExpenseShares(expenseId?: string) {
  return useQuery({
    queryKey: queryKeys.expenseShares(expenseId),
    queryFn: async () => {
      if (!expenseId) throw new Error("Missing expense ID");

      const { data, error } =
        await expenseShareService.getExpenseShares(expenseId);

      if (error) throw error;

      return data ?? [];
    },
    enabled: !!expenseId,
  });
}
