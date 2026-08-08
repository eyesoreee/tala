import { View } from "react-native";
import ExpenseListItem from "./ExpenseListItem";
import SectionHeader from "./SectionHeader";

export default function RecentExpenses() {
  return (
    <View className="gap-4">
      <SectionHeader
        title="Recent Expenses"
        actionLabel="View all"
        onPress={() => {}}
      />

      <View className="bg-surface rounded-3xl px-6">
        <ExpenseListItem
          initial="M"
          title="Rice"
          subtitle="Mom · Aug 3"
          amount="₱1,250"
        />

        <View className="h-px bg-outline-variant" />

        <ExpenseListItem
          initial="D"
          title="Fuel"
          subtitle="Dad · Aug 2"
          amount="₱500"
        />

        <View className="h-px bg-outline-variant" />

        <ExpenseListItem
          initial="D"
          title="Internet"
          subtitle="Dad · Aug 1"
          amount="₱1,700"
        />
      </View>
    </View>
  );
}
