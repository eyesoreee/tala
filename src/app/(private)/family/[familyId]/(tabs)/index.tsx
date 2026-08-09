import FloatingActionButton from "@/components/FloatingActionButton";
import DashboardHeader from "@/components/family/DashboardHeader";
import MonthlySnapshot from "@/components/family/MonthlySnapshot";
import RecentExpenses, {
  RecentExpenseItem,
} from "@/components/family/RecentExpenses";
import { colors } from "@/constants/colors";
import { Expense } from "@/constants/expense";
import { FamilyMember } from "@/constants/family-member";
import { useAuth } from "@/contexts/AuthContext";
import { expenseService } from "@/services/expenses.services";
import { familyMemberService } from "@/services/family-member.services";
import { familyService } from "@/services/family.services";
import {
  currentMonthLabel,
  formatPeso,
  formatShortDate,
  getInitials,
  monthKey,
} from "@/utils/format";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RECENT_EXPENSE_LIMIT = 8;

export default function HomeTabScreen() {
  const { familyId } = useLocalSearchParams<{ familyId: string }>();
  const { session } = useAuth();

  const [familyName, setFamilyName] = useState("");
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(
    async (isRefresh = false) => {
      if (!familyId || !session) return;

      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const [familyRes, membersRes, expensesRes] = await Promise.all([
        familyService.getFamilyById(familyId),
        familyMemberService.getMembers(familyId),
        expenseService.getFamilyExpenses(familyId),
      ]);

      if (familyRes.data) setFamilyName(familyRes.data.name ?? "");
      if (membersRes.data) setMembers(membersRes.data);
      if (expensesRes.data) setExpenses(expensesRes.data);

      setLoading(false);
      setRefreshing(false);
    },
    [familyId, session],
  );

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const membersById = useMemo(() => {
    const map = new Map<string, FamilyMember>();
    for (const member of members) map.set(member.id, member);
    return map;
  }, [members]);

  const myMemberId = useMemo(() => {
    const me = members.find((m) => m.userId === session?.user.id);
    return me?.id ?? null;
  }, [members, session]);

  const currentMonth = monthKey(new Date());

  const { totalSpent, youPaid } = useMemo(() => {
    let spent = 0;
    let paid = 0;

    for (const expense of expenses) {
      if (monthKey(new Date(expense.expenseDate)) === currentMonth) {
        spent += expense.amount;
        if (expense.paidByMemberId === myMemberId) paid += expense.amount;
      }
    }

    return {
      totalSpent: spent,
      youPaid: paid,
    };
  }, [expenses, currentMonth, myMemberId]);

  const recentItems: RecentExpenseItem[] = expenses
    .slice(0, RECENT_EXPENSE_LIMIT)
    .map((expense) => {
      const payer = membersById.get(expense.paidByMemberId);
      const name = payer?.nickname ?? "Member";
      return {
        initial: getInitials(name),
        title: expense.title,
        subtitle: `${name} · ${formatShortDate(expense.expenseDate)}`,
        amount: formatPeso(expense.amount),
      };
    });

  const nickname = membersById.get(myMemberId ?? "")?.nickname ?? "there";

  const goToExpenses = useCallback(() => {
    if (!familyId) return;
    router.push(`/family/${familyId}/expenses`);
  }, [familyId]);

  const openAddExpense = useCallback(() => {
    if (!familyId) return;
    router.push(`/family/${familyId}/add-expense`);
  }, [familyId]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-8 py-4 gap-8 pb-28"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => load(true)}
          />
        }
      >
        {loading ? (
          <View className="flex-1 items-center justify-center py-32">
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <>
            <DashboardHeader
              nickname={nickname}
              familyName={familyName}
              initials={getInitials(nickname)}
            />
            <MonthlySnapshot
              monthLabel={currentMonthLabel()}
              totalSpent={formatPeso(totalSpent)}
              youPaid={formatPeso(youPaid)}
              youOwe="—"
              othersOweYou="—"
              onThisMonthPress={goToExpenses}
            />
            <RecentExpenses items={recentItems} onViewAll={goToExpenses} />
          </>
        )}
      </ScrollView>

      <FloatingActionButton onPress={openAddExpense} />
    </SafeAreaView>
  );
}
