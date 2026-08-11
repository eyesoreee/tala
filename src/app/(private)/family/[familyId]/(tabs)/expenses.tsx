import ExpenseCard from "@/components/expenses/ExpenseCard";
import ExpenseHeader from "@/components/expenses/ExpenseHeader";
import MonthYearPicker from "@/components/expenses/MonthYearPicker";
import SearchFilterSection from "@/components/expenses/SearchFilterSection";
import { CATEGORIES } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { Expense } from "@/constants/expense";
import { useExpenses } from "@/hooks/useExpenses";
import { useFamilyMembers } from "@/hooks/useFamilyMembers";
import {
  formatMonthYear,
  formatNumber,
  formatShortDate,
  getInitials,
  monthKey,
} from "@/utils/format";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useGlobalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  SectionList,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ExpenseGroup {
  dateKey: string;
  label: string;
  items: Expense[];
}

export default function ExpensesTabScreen() {
  const { familyId } = useGlobalSearchParams<{ familyId: string }>();

  const {
    data: expenses = [],
    isLoading,
    isRefetching,
    refetch,
  } = useExpenses(familyId);
  const { data: members = [] } = useFamilyMembers(familyId);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CATEGORIES>(
    CATEGORIES.ALL,
  );
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const membersById = useMemo(
    () => new Map(members.map((member) => [member.id, member])),
    [members],
  );

  const filteredExpenses = useMemo(() => {
    const month = monthKey(visibleMonth);
    const query = searchQuery.trim().toLowerCase();

    return expenses.filter((expense) => {
      if (monthKey(new Date(expense.expenseDate)) !== month) return false;

      if (
        selectedCategory !== CATEGORIES.ALL &&
        expense.category !== selectedCategory
      ) {
        return false;
      }

      if (query) {
        const payer =
          membersById.get(expense.paidByMemberId)?.nickname ?? "Member";
        const haystack = `${expense.title} ${payer}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [expenses, visibleMonth, selectedCategory, searchQuery, membersById]);

  const groups = useMemo<ExpenseGroup[]>(() => {
    const byDay = new Map<string, Expense[]>();

    for (const expense of filteredExpenses) {
      const dateKey = expense.expenseDate.slice(0, 10);
      const day = byDay.get(dateKey);
      if (day) {
        day.push(expense);
      } else {
        byDay.set(dateKey, [expense]);
      }
    }

    const todayKey = new Date().toISOString().slice(0, 10);

    return [...byDay.entries()]
      .sort(([a], [b]) => (a < b ? 1 : -1))
      .map(([dateKey, items]) => {
        const prefix = dateKey === todayKey ? "Today, " : "";
        return {
          dateKey,
          label: `${prefix}${formatShortDate(dateKey)}`,
          items,
        };
      });
  }, [filteredExpenses]);

  const sections = useMemo(
    () => groups.map((group) => ({ title: group.label, data: group.items })),
    [groups],
  );

  const changeMonth = (offset: number) => {
    setVisibleMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1),
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-8 py-4"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="gap-6">
            <ExpenseHeader
              monthLabel={formatMonthYear(visibleMonth)}
              onPress={() => setShowMonthPicker(true)}
            />

            <SearchFilterSection
              searchQuery={searchQuery}
              onSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <MonthYearPicker
              visible={showMonthPicker}
              value={visibleMonth}
              onChange={setVisibleMonth}
              onClose={() => setShowMonthPicker(false)}
            />

            <View className="flex-row justify-between items-center">
              <Text className="text-md font-medium text-text-faint">
                {formatMonthYear(visibleMonth)}
              </Text>

              <View className="flex-row gap-4">
                <Pressable
                  onPress={() => changeMonth(-1)}
                  className="active:opacity-70"
                >
                  <Ionicons
                    name="chevron-back"
                    color={colors.textFaint}
                    size={20}
                  />
                </Pressable>

                <Pressable
                  onPress={() => changeMonth(1)}
                  className="active:opacity-70"
                >
                  <Ionicons
                    name="chevron-forward"
                    color={colors.textFaint}
                    size={20}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <Text className="pt-6 pb-2 text-md font-medium text-text-faint">
            {section.title}
          </Text>
        )}
        renderItem={({ item, index, section }) => {
          const payer =
            membersById.get(item.paidByMemberId)?.nickname ?? "Member";
          const isFirst = index === 0;
          const isLast = index === section.data.length - 1;

          return (
            <View
              className={`bg-surface px-6 ${isFirst ? "rounded-t-3xl" : ""} ${isLast ? "rounded-b-3xl" : ""}`}
            >
              {index > 0 && <View className="h-px bg-outline-variant/50" />}
              <ExpenseCard
                initial={getInitials(payer)}
                title={item.title}
                amount={formatNumber(item.amount)}
                category={item.category as CATEGORIES}
                paidBy={payer}
              />
            </View>
          );
        }}
        ListEmptyComponent={
          isLoading ? (
            <View className="py-16 items-center justify-center">
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            <View className="mt-4 bg-surface rounded-3xl px-6">
              <Text className="py-10 text-center text-sm text-text-faint">
                {expenses.length > 0
                  ? `No expenses in ${formatMonthYear(visibleMonth)}.`
                  : "No expenses yet. Tap + to add your first one."}
              </Text>
            </View>
          )
        }
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      />
    </SafeAreaView>
  );
}
