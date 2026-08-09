import { queryKeys } from "@/lib/query-keys";
import { familyMemberService } from "@/services/family-member.services";
import { useQuery } from "@tanstack/react-query";

interface UseFamilyMembersOptions {
  enabled?: boolean;
}

export function useFamilyMembers(
  familyId?: string,
  options?: UseFamilyMembersOptions,
) {
  return useQuery({
    queryKey: queryKeys.familyMembers(familyId),
    queryFn: async () => {
      if (!familyId) throw new Error("Missing family ID");

      const { data, error } = await familyMemberService.getMembers(familyId);

      if (error) throw error;

      return data ?? [];
    },
    enabled: !!familyId && (options?.enabled ?? true),
  });
}
