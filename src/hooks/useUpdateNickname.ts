import { queryKeys } from "@/lib/query-keys";
import { familyMemberService } from "@/services/family-member.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateNickname(familyId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      memberId,
      nickname,
    }: {
      memberId: string;
      nickname: string;
    }) => {
      const { data, error } = await familyMemberService.update(memberId, {
        nickname,
      });

      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      if (!familyId) return;

      void queryClient.invalidateQueries({
        queryKey: queryKeys.familyMembers(familyId),
      });
    },
  });
}
