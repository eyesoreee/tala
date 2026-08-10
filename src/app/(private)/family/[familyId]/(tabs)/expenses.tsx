import ExpenseCard from "@/components/expenses/ExpenseCard";
import ExpenseHeader from "@/components/expenses/ExpenseHeader";
import SearchFilterSection from "@/components/expenses/SearchFilterSection";
import { CATEGORIES } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface DummyData {
  initial: string;
  category: CATEGORIES;
  title: string;
  paidBy: string;
  amount: string;
}

export default function ExpensesTabScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CATEGORIES>(
    CATEGORIES.ALL,
  );
  const [dummyData, setDummyData] = useState<DummyData[]>([]);

  useEffect(() => {
    setDummyData([
      {
        initial: "M",
        category: CATEGORIES.BILLS,
        title: "Electricity",
        paidBy: "Mom",
        amount: "2,900",
      },
      {
        initial: "M",
        category: CATEGORIES.BILLS,
        title: "Electricity",
        paidBy: "Mom",
        amount: "2,900",
      },
    ] as DummyData[]);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-8 py-4 gap-6"
        showsVerticalScrollIndicator={false}
      >
        <ExpenseHeader onPress={() => {}} />

        <SearchFilterSection
          searchQuery={searchQuery}
          onSearchQuery={setSearchQuery}
          onFilter={() => {}}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <View>
          <View className="flex-row pt-4 justify-between items-center">
            <Text className="text-md font-medium text-text-faint">
              August 2026
            </Text>

            <View className="flex-row gap-4">
              <Pressable onPress={() => {}} className="active:opacity-70">
                <Ionicons
                  name="chevron-back"
                  color={colors.textFaint}
                  size={20}
                />
              </Pressable>

              <Pressable onPress={() => {}} className="active:opacity-70">
                <Ionicons
                  name="chevron-forward"
                  color={colors.textFaint}
                  size={20}
                />
              </Pressable>
            </View>
          </View>

          <Text className="pt-6 pb-2 text-md font-medium text-text-faint">
            Today, Aug 3
          </Text>

          <View className="bg-surface rounded-3xl px-6">
            {dummyData.length === 0 ? (
              <Text className="py-10 text-center text-sm text-text-faint">
                No expenses yet. Tap + to add your first one.
              </Text>
            ) : (
              dummyData.map((expense, idx) => (
                <View key={idx}>
                  {idx > 0 && <View className="h-px bg-outline-variant/50" />}
                  <ExpenseCard
                    initial={expense.initial}
                    title={expense.title}
                    amount={expense.amount}
                    category={expense.category}
                    paidBy={expense.paidBy}
                  />
                </View>
              ))
            )}
          </View>

          <Text className="pt-6 pb-2 text-md font-medium text-text-faint">
            Aug 2
          </Text>

          <View className="bg-surface rounded-3xl px-6">
            {dummyData.length === 0 ? (
              <Text className="py-10 text-center text-sm text-text-faint">
                No expenses yet. Tap + to add your first one.
              </Text>
            ) : (
              dummyData.map((expense, idx) => (
                <View key={idx}>
                  {idx > 0 && <View className="h-px bg-outline-variant/50" />}
                  <ExpenseCard
                    initial={expense.initial}
                    title={expense.title}
                    amount={expense.amount}
                    category={expense.category}
                    paidBy={expense.paidBy}
                  />
                </View>
              ))
            )}
          </View>

          <Text className="pt-6 pb-2 text-md font-medium text-text-faint">
            Aug 1
          </Text>

          <View className="bg-surface rounded-3xl px-6">
            {dummyData.length === 0 ? (
              <Text className="py-10 text-center text-sm text-text-faint">
                No expenses yet. Tap + to add your first one.
              </Text>
            ) : (
              dummyData.map((expense, idx) => (
                <View key={idx}>
                  {idx > 0 && <View className="h-px bg-outline-variant/50" />}
                  <ExpenseCard
                    initial={expense.initial}
                    title={expense.title}
                    amount={expense.amount}
                    category={expense.category}
                    paidBy={expense.paidBy}
                  />
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
