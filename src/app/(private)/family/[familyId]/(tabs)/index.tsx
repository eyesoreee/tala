import AccountMenu from "@/components/dashboard/AccountMenu";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MonthlySnapshot from "@/components/dashboard/MonthlySnapshot";
import RecentExpenses from "@/components/dashboard/RecentExpenses";
import ExpenseDetailModal from "@/components/expenses/ExpenseDetailModal";
import FloatingActionButton from "@/components/FloatingActionButton";
import { colors } from "@/constants/colors";
import { Expense } from "@/constants/expense";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboard } from "@/hooks/useDashboard";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeTabScreen() {
  const { signOut } = useAuth();
  const {
    familyName,
    nickname,
    initials,
    loading,
    refreshing,
    monthLabel,
    totalSpent,
    youPaid,
    youOwe,
    othersOweYou,
    recentItems,
    members,
    refresh,
    goToExpenses,
    openAddExpense,
    openProfile,
  } = useDashboard();

  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const onAvatarPress = useCallback(() => setAccountMenuVisible(true), []);

  const onSignOut = useCallback(() => {
    setAccountMenuVisible(false);
    void signOut();
  }, [signOut]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-8 py-4 gap-8 pb-28"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
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
              initials={initials}
              onAvatarPress={onAvatarPress}
            />

            <MonthlySnapshot
              monthLabel={monthLabel}
              totalSpent={totalSpent}
              youPaid={youPaid}
              youOwe={youOwe}
              othersOweYou={othersOweYou}
              onThisMonthPress={goToExpenses}
            />

            <RecentExpenses
              items={recentItems}
              onViewAll={goToExpenses}
              onExpensePress={setSelectedExpense}
            />
          </>
        )}
      </ScrollView>

      <FloatingActionButton onPress={openAddExpense} />

      <ExpenseDetailModal
        key={selectedExpense?.id ?? "none"}
        expense={selectedExpense}
        members={members}
        onClose={() => setSelectedExpense(null)}
      />

      <AccountMenu
        visible={accountMenuVisible}
        nickname={nickname}
        initials={initials}
        familyName={familyName}
        onClose={() => setAccountMenuVisible(false)}
        onGoToProfile={openProfile}
        onSignOut={onSignOut}
      />
    </SafeAreaView>
  );
}
