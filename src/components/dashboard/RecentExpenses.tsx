import { Expense } from "@/constants/expense";
import { Text, View } from "react-native";
import RecentExpenseListItem from "./RecentExpenseListItem";
import SectionHeader from "./SectionHeader";

export interface RecentExpenseItem {
  initial: string;
  title: string;
  subtitle: string;
  amount: string;
  expense: Expense;
}

interface RecentExpensesProps {
  items: RecentExpenseItem[];
  onViewAll?: () => void;
  onExpensePress?: (expense: Expense) => void;
}

export default function RecentExpenses({
  items,
  onViewAll,
  onExpensePress,
}: RecentExpensesProps) {
  return (
    <View className="gap-4">
      <SectionHeader
        title="Recent Expenses"
        actionLabel="View all"
        onPress={onViewAll}
      />

      <View className="bg-surface rounded-2xl px-6">
        {items.length === 0 ? (
          <Text className="py-10 text-center text-sm text-text-faint">
            No expenses yet. Tap + to add your first one.
          </Text>
        ) : (
          items.map((item, index) => (
            <View key={index}>
              {index > 0 && <View className="h-px bg-outline-variant" />}
              <RecentExpenseListItem
                initial={item.initial}
                title={item.title}
                subtitle={item.subtitle}
                amount={item.amount}
                onViewDetails={
                  onExpensePress
                    ? () => onExpensePress(item.expense)
                    : undefined
                }
              />
            </View>
          ))
        )}
      </View>
    </View>
  );
}
