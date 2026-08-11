import { queryKeys } from "@/lib/query-keys";
import {
  CreateExpenseInput,
  expenseService,
} from "@/services/expenses.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateExpenseInput) =>
      expenseService.createExpense(input),
    onSuccess: (_data, input) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.expenses(input.familyId),
      });
    },
  });
}
