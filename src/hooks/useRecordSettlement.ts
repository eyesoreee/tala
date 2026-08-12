import { queryKeys } from "@/lib/query-keys";
import { settlementService } from "@/services/settlement.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRecordSettlement(familyId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      fromMemberId,
      toMemberId,
      amount,
      notes,
      expenseId,
    }: {
      fromMemberId: string;
      toMemberId: string;
      amount: number;
      notes?: string;
      expenseId?: string | null;
    }) => {
      if (!familyId) throw new Error("Missing family ID");

      const { data, error } = await settlementService.recordSettlement(
        familyId,
        { fromMemberId, toMemberId, amount, notes, expenseId },
      );

      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      if (!familyId) return;

      queryClient.invalidateQueries({
        queryKey: queryKeys.settlements(familyId),
      });
    },
  });
}
