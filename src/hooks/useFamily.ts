import { queryKeys } from "@/lib/query-keys";
import { familyService } from "@/services/family.services";
import { useQuery } from "@tanstack/react-query";

interface UseFamilyOptions {
  enabled?: boolean;
}

export function useFamily(familyId?: string, options?: UseFamilyOptions) {
  return useQuery({
    queryKey: queryKeys.family(familyId),
    queryFn: async () => {
      if (!familyId) throw new Error("Missing family ID");

      const { data, error } = await familyService.getFamilyById(familyId);

      if (error) throw error;

      return data;
    },
    enabled: !!familyId && (options?.enabled ?? true),
  });
}