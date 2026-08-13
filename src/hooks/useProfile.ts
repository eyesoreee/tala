import { useAuth } from "@/contexts/AuthContext";
import { useFamily } from "@/hooks/useFamily";
import { useFamilyMembers } from "@/hooks/useFamilyMembers";
import { getInitials } from "@/utils/format";
import { useCallback, useMemo } from "react";

export function useProfile(familyId?: string) {
  const { session } = useAuth();

  const familyQuery = useFamily(familyId);
  const membersQuery = useFamilyMembers(familyId);

  const familyName = familyQuery.data?.name ?? "";
  const inviteCode = familyQuery.data?.inviteCode ?? "";
  const { data: members = [] } = membersQuery;

  const loading = familyQuery.isLoading || membersQuery.isLoading;
  const refreshing = familyQuery.isRefetching || membersQuery.isRefetching;

  const myMember = useMemo(
    () => members.find((member) => member.userId === session?.user.id) ?? null,
    [members, session],
  );

  const nickname = myMember?.nickname ?? "there";
  const role = myMember?.role ?? "member";
  const initials = getInitials(nickname);
  const myMemberId = myMember?.id ?? null;

  const sortedMembers = useMemo(
    () =>
      [...members].sort((a, b) => {
        if (a.userId === session?.user.id) return -1;
        if (b.userId === session?.user.id) return 1;
        return a.nickname.localeCompare(b.nickname);
      }),
    [members, session],
  );

  const refresh = useCallback(async () => {
    await Promise.all([familyQuery.refetch(), membersQuery.refetch()]);
  }, [familyQuery, membersQuery]);

  return {
    familyName,
    inviteCode,
    members: sortedMembers,
    myMember,
    myMemberId,
    nickname,
    role,
    initials,
    loading,
    refreshing,
    refresh,
  };
}
