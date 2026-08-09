import { Text, View } from "react-native";
import ExpenseListItem from "./ExpenseListItem";
import SectionHeader from "./SectionHeader";

export interface RecentExpenseItem {
  initial: string;
  title: string;
  subtitle: string;
  amount: string;
}

interface RecentExpensesProps {
  items: RecentExpenseItem[];
  onViewAll?: () => void;
}

export default function RecentExpenses({
  items,
  onViewAll,
}: RecentExpensesProps) {
  return (
    <View className="gap-4">
      <SectionHeader
        title="Recent Expenses"
        actionLabel="View all"
        onPress={onViewAll}
      />

      <View className="bg-surface rounded-3xl px-6">
        {items.length === 0 ? (
          <Text className="py-10 text-center text-sm text-text-faint">
            No expenses yet. Tap + to add your first one.
          </Text>
        ) : (
          items.map((item, index) => (
            <View key={index}>
              {index > 0 && <View className="h-px bg-outline-variant" />}
              <ExpenseListItem
                initial={item.initial}
                title={item.title}
                subtitle={item.subtitle}
                amount={item.amount}
              />
            </View>
          ))
        )}
      </View>
    </View>
  );
}
