import { queryKeys } from "@/lib/query-keys";
import { settlementService } from "@/services/settlement.services";
import { useQuery } from "@tanstack/react-query";

export function useSettlements(familyId?: string) {
  return useQuery({
    queryKey: queryKeys.settlements(familyId),
    queryFn: async () => {
      if (!familyId) throw new Error("Missing family ID");

      const { data, error } =
        await settlementService.getFamilySettlements(familyId);

      if (error) throw error;

      return data ?? [];
    },
    enabled: !!familyId,
  });
}
