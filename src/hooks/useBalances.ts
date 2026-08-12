import { FamilyMember } from "@/constants/family-member";
import { useAuth } from "@/contexts/AuthContext";
import { queryKeys } from "@/lib/query-keys";
import { expenseShareService } from "@/services/expense-share.services";
import { expenseService } from "@/services/expenses.services";
import { familyMemberService } from "@/services/family-member.services";
import { settlementService } from "@/services/settlement.services";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export interface BalanceRow {
  member: FamilyMember;
  amount: number;
}

export function useBalances(familyId?: string) {
  const { session } = useAuth();

  const membersQuery = useQuery({
    queryKey: queryKeys.familyMembers(familyId),
    queryFn: async () => {
      if (!familyId) throw new Error("Missing family ID");
      const { data, error } = await familyMemberService.getMembers(familyId);
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!familyId,
  });

  const expensesQuery = useQuery({
    queryKey: queryKeys.expenses(familyId),
    queryFn: async () => {
      if (!familyId) throw new Error("Missing family ID");
      const { data, error } = await expenseService.getFamilyExpenses(familyId);
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!familyId,
  });

  const sharesQuery = useQuery({
    queryKey: queryKeys.familyShares(familyId),
    queryFn: async () => {
      if (!familyId) throw new Error("Missing family ID");
      const { data, error } =
        await expenseShareService.getFamilyShares(familyId);
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!familyId,
  });

  const settlementsQuery = useQuery({
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

  const { data: members = [] } = membersQuery;
  const { data: expenses = [] } = expensesQuery;
  const { data: shares = [] } = sharesQuery;
  const { data: settlements = [] } = settlementsQuery;

  const loading =
    membersQuery.isLoading ||
    expensesQuery.isLoading ||
    sharesQuery.isLoading ||
    settlementsQuery.isLoading;

  const refreshing =
    membersQuery.isRefetching ||
    expensesQuery.isRefetching ||
    sharesQuery.isRefetching ||
    settlementsQuery.isRefetching;

  const myMemberId =
    members.find((member) => member.userId === session?.user.id)?.id ?? null;

  const balances = useMemo(() => {
    const net = new Map<string, Map<string, number>>();

    const add = (fromId: string, toId: string, amount: number) => {
      const row = net.get(fromId) ?? new Map<string, number>();
      row.set(toId, (row.get(toId) ?? 0) + amount);
      net.set(fromId, row);
    };

    for (const expense of expenses) {
      const shareMemberIds = shares
        .filter((share) => share.expenseId === expense.id)
        .map((share) => share.memberId);

      if (shareMemberIds.length === 0) continue;

      const perShare = Math.round(expense.amount / shareMemberIds.length);

      for (const memberId of shareMemberIds) {
        if (memberId === expense.paidByMemberId) continue;
        add(memberId, expense.paidByMemberId, perShare);
      }
    }

    for (const settlement of settlements) {
      add(settlement.fromMemberId, settlement.toMemberId, -settlement.amount);
    }

    return net;
  }, [expenses, shares, settlements]);

  const { youOwe, owedToYou, totalYouOwe, totalOwedToYou, netBalance } =
    useMemo(() => {
      if (!myMemberId) {
        return {
          youOwe: [] as BalanceRow[],
          owedToYou: [] as BalanceRow[],
          totalYouOwe: 0,
          totalOwedToYou: 0,
          netBalance: 0,
        };
      }

      const youOweRows: BalanceRow[] = [];
      const owedToYouRows: BalanceRow[] = [];

      for (const member of members) {
        if (member.id === myMemberId) continue;

        const amountYouOwe = Math.round(
          balances.get(myMemberId)?.get(member.id) ?? 0,
        );
        if (amountYouOwe > 0) {
          youOweRows.push({ member, amount: amountYouOwe });
        }

        const amountOwedToYou = Math.round(
          balances.get(member.id)?.get(myMemberId) ?? 0,
        );
        if (amountOwedToYou > 0) {
          owedToYouRows.push({ member, amount: amountOwedToYou });
        }
      }

      youOweRows.sort((a, b) => b.amount - a.amount);
      owedToYouRows.sort((a, b) => b.amount - a.amount);

      const totalYouOwe = youOweRows.reduce((sum, row) => sum + row.amount, 0);
      const totalOwedToYou = owedToYouRows.reduce(
        (sum, row) => sum + row.amount,
        0,
      );

      return {
        youOwe: youOweRows,
        owedToYou: owedToYouRows,
        totalYouOwe,
        totalOwedToYou,
        netBalance: totalOwedToYou - totalYouOwe,
      };
    }, [balances, members, myMemberId]);

  const refetch = async () => {
    await Promise.all([
      membersQuery.refetch(),
      expensesQuery.refetch(),
      sharesQuery.refetch(),
      settlementsQuery.refetch(),
    ]);
  };

  return {
    members,
    myMemberId,
    youOwe,
    owedToYou,
    totalYouOwe,
    totalOwedToYou,
    netBalance,
    loading,
    refreshing,
    refetch,
  };
}
