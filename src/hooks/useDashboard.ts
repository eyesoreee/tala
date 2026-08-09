import { RecentExpenseItem } from "@/components/family/RecentExpenses";
import { useAuth } from "@/contexts/AuthContext";
import { useExpenses } from "@/hooks/useExpenses";
import { useFamily } from "@/hooks/useFamily";
import { useFamilyMembers } from "@/hooks/useFamilyMembers";
import {
  currentMonthLabel,
  formatPeso,
  formatShortDate,
  getInitials,
  monthKey,
} from "@/utils/format";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo } from "react";

const RECENT_EXPENSE_LIMIT = 8;

export function useDashboard() {
  const { familyId } = useLocalSearchParams<{ familyId: string }>();
  const { session } = useAuth();

  const familyQuery = useFamily(familyId);
  const membersQuery = useFamilyMembers(familyId);
  const expensesQuery = useExpenses(familyId);

  const familyName = familyQuery.data?.name ?? "";
  const members = membersQuery.data ?? [];
  const expenses = expensesQuery.data ?? [];

  const loading =
    familyQuery.isLoading || membersQuery.isLoading || expensesQuery.isLoading;

  const refreshing =
    familyQuery.isRefetching ||
    membersQuery.isRefetching ||
    expensesQuery.isRefetching;

  const membersById = useMemo(
    () => new Map(members.map((member) => [member.id, member])),
    [members],
  );

  const myMemberId =
    members.find((member) => member.userId === session?.user.id)?.id ?? null;

  const { totalSpent, youPaid } = useMemo(() => {
    const currentMonth = monthKey(new Date());

    let totalSpent = 0;
    let youPaid = 0;

    for (const expense of expenses) {
      if (monthKey(new Date(expense.expenseDate)) !== currentMonth) {
        continue;
      }

      totalSpent += expense.amount;

      if (expense.paidByMemberId === myMemberId) {
        youPaid += expense.amount;
      }
    }

    return {
      totalSpent,
      youPaid,
    };
  }, [expenses, myMemberId]);

  const recentItems = useMemo<RecentExpenseItem[]>(
    () =>
      expenses.slice(0, RECENT_EXPENSE_LIMIT).map((expense) => {
        const payer = membersById.get(expense.paidByMemberId);
        const name = payer?.nickname ?? "Member";

        return {
          initial: getInitials(name),
          title: expense.title,
          subtitle: `${name} · ${formatShortDate(expense.expenseDate)}`,
          amount: formatPeso(expense.amount),
        };
      }),
    [expenses, membersById],
  );

  const nickname = membersById.get(myMemberId ?? "")?.nickname ?? "there";

  const refresh = useCallback(async () => {
    await Promise.all([
      familyQuery.refetch(),
      membersQuery.refetch(),
      expensesQuery.refetch(),
    ]);
  }, [familyQuery, membersQuery, expensesQuery]);

  const goToExpenses = useCallback(() => {
    if (!familyId) return;

    router.push(`/family/${familyId}/expenses`);
  }, [familyId]);

  const openAddExpense = useCallback(() => {
    if (!familyId) return;

    router.push(`/family/${familyId}/add-expense`);
  }, [familyId]);

  return {
    familyName,
    nickname,
    initials: getInitials(nickname),

    loading,
    refreshing,

    totalSpent: formatPeso(totalSpent),
    youPaid: formatPeso(youPaid),

    youOwe: "—",
    othersOweYou: "—",

    monthLabel: currentMonthLabel(),
    recentItems,

    refresh,
    goToExpenses,
    openAddExpense,
  };
}
